import ImageMeta from 'entities/ImageMeta';
import Recipe from 'entities/Recipe';
import User from 'entities/User';
import { createReadStream } from 'fs';
import fs from 'fs-extra';
import path from 'path';
import CategoryRepository from 'repositories/CategoryRepository';
import CuisineRepository from 'repositories/CuisineRepository';
import RecipeInput from 'resolvers/inputTypes/RecipeInput';
import { RecipeResolver } from 'resolvers/RecipeResolver';
import { ResolverContext } from 'resolvers/types';
import FileService from 'services/FileService';
import ImageService from 'services/ImageService';
import RecipeService from 'services/RecipeService';
import UserService from 'services/UserService';
import { connection, createResolverContext } from 'test/utils';
import config from '../../config';

const email = 'me@email.com';
const plainTextPassword = 'password';
let user: User;

let imageService: ImageService;
let categoryRepository: CategoryRepository;
let cuisineRepository: CuisineRepository;

let recipeResolver: RecipeResolver;
let context: ResolverContext;

let cuisineId: number;

beforeAll(async () => {
  const db = await connection;

  const userService = new UserService(db.getRepository(User));
  user = await userService.create({
    email,
    plainTextPassword,
  });

  imageService = new ImageService(db.getRepository(ImageMeta), new FileService());
  categoryRepository = db.getCustomRepository(CategoryRepository);
  cuisineRepository = db.getCustomRepository(CuisineRepository);

  const recipeService = new RecipeService(
    imageService,
    db.getRepository(Recipe),
    categoryRepository,
    cuisineRepository
  );

  recipeResolver = new RecipeResolver(recipeService, imageService);
  context = createResolverContext(user);
});

afterAll(async () => (await connection).dropDatabase());

it('creates a recipe and retrieves it', async () => {
  const newRecipe = await recipeResolver.addRecipe(
    {
      title: 'Lamb',
      author: user,
      categories: [{ name: 'Meat' }],
      cuisines: [{ name: 'Dinner' }],
    },
    context
  );

  const foundRecipe = await recipeResolver.recipe(newRecipe.id, context);
  const cuisines = await foundRecipe?.cuisines;
  cuisineId = (cuisines || [])[0].id;

  expect(newRecipe.id).toBeDefined();
  expect(foundRecipe?.title).toEqual('Lamb');
});

it('creates multiple recipes', async () => {
  const newRecipes = await Promise.all([
    recipeResolver.addRecipe(
      {
        title: 'Beef',
        author: user,
        categories: [{ name: 'Meat' }],
        cuisines: [{ id: cuisineId }],
      },
      context
    ),
    recipeResolver.addRecipe(
      {
        title: 'Chicken',
        author: user,
        categories: [{ name: 'Poultry' }],
        cuisines: [{ id: cuisineId }],
      },
      context
    ),
    recipeResolver.addRecipe(
      {
        title: 'Pork',
        author: user,
      },
      context
    ),
  ]);

  const userRecipes = await recipeResolver.recipes(context);
  const categories = await categoryRepository.find();
  const cuisines = await cuisineRepository.find();

  expect(newRecipes.length).toEqual(3);
  expect(userRecipes.length).toEqual(4);
  expect(categories.length).toEqual(2);
  expect(cuisines.length).toEqual(1);
  expect(cuisines[0].name).toEqual('Dinner');
});

it('adds recipes with staged images', async () => {
  const imageOne = 'http://imageOne';
  const imageId = await imageService.stageImage({ url: imageOne });

  const recipe = await recipeResolver.addRecipe(
    {
      title: 'Test',
      author: user,
      stagedImages: [{ id: imageId, order: 1 }],
    },
    context
  );

  const recipeImages = (await recipe.images) || [];

  expect(recipeImages[0].url).toEqual(imageOne);

  const imageTwo = 'cheese.jpg';
  const secondImageId = await recipeResolver.stageImage({
    filename: imageTwo,
    mimetype: 'image/jpeg',
    encoding: '',
    createReadStream: () => createReadStream(path.join(__dirname, '../fixtures', imageTwo)),
  });

  const editedInput: RecipeInput = {
    id: recipe.id,
    title: recipe.title,
    author: await recipe.author,
    stagedImages: [
      { id: imageId, order: 3 },
      { id: secondImageId, order: 2 },
      { id: 'some_unstaged_image', order: 1 },
    ],
  };

  const editedRecipe = await recipeResolver.addRecipe(editedInput, context);

  // Remove the uploaded image once it's been used.
  await fs.remove(path.join(config.uploads.dir, secondImageId + '.jpg'));

  /**
   * Currently the client would need to sort the images by the order prop. In the future  this will
   * not be necessary as the service will do the sorting.
   * TODO: Remove the sort once the images get sorted automatically.
   */
  const editedRecipeImages = ((await editedRecipe.images) || []).sort(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (img1, img2) => img1.order! - img2.order!
  );

  expect(editedRecipeImages.length).toEqual(2);
  expect(editedRecipeImages[0].filename).toBeTruthy();
  expect(editedRecipeImages[0].mimetype).toEqual('image/jpeg');
  expect(editedRecipeImages[1].url).toEqual(imageOne);
});
