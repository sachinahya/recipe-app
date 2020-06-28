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
import UserDataResolver from 'resolvers/UserDataResolver';
import FileService from 'services/FileService';
import ImageService from 'services/ImageService';
import RecipeService from 'services/RecipeService';
import UserService from 'services/UserService';
import { user1Input, user2Input } from 'test/fixtures/users';
import { connection, createResolverContext } from 'test/utils';

import config from '../../config';

let user1: User;
let context1: ResolverContext;

let user2: User;
let context2: ResolverContext;

let imageService: ImageService;
let recipeResolver: RecipeResolver;
let userDataResolver: UserDataResolver;

let cuisineId: number;

beforeAll(async () => {
  const db = await connection;

  const userService = new UserService(db.getRepository(User));
  user1 = await userService.create(user1Input);
  user2 = await userService.create(user2Input);
  context1 = createResolverContext(user1);
  context2 = createResolverContext(user2);

  imageService = new ImageService(db.getRepository(ImageMeta), new FileService());
  const categoryRepository = db.getCustomRepository(CategoryRepository);
  const cuisineRepository = db.getCustomRepository(CuisineRepository);

  const recipeService = new RecipeService(
    imageService,
    db.getRepository(Recipe),
    categoryRepository,
    cuisineRepository
  );

  recipeResolver = new RecipeResolver(recipeService, imageService);
  userDataResolver = new UserDataResolver(db.getRepository(User));
});

afterAll(async () => (await connection).dropDatabase());

it('creates a recipe and retrieves it', async () => {
  const newRecipe = await recipeResolver.addRecipe(
    {
      title: 'Lamb',
      author: user1,
      categories: [{ name: 'Meat' }],
      cuisines: [{ name: 'Dinner' }],
    },
    context1
  );

  const foundRecipe = await recipeResolver.recipe(newRecipe.id, context1);
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
        author: user1,
        categories: [{ name: 'Meat' }],
        cuisines: [{ id: cuisineId }],
      },
      context1
    ),
    recipeResolver.addRecipe(
      {
        title: 'Chicken',
        author: user1,
        categories: [{ name: 'Poultry' }],
        cuisines: [{ name: 'Italian' }],
      },
      context2
    ),
    recipeResolver.addRecipe(
      {
        title: 'Pork',
        author: user1,
      },
      context2
    ),
  ]);

  const userRecipes = await recipeResolver.recipes(context1);

  expect(newRecipes.length).toEqual(3);
  expect(userRecipes.length).toEqual(2);
});

it('retrieves the correct categories and cuisines for each user', async () => {
  let categories = await userDataResolver.userCategories(context1);
  let cuisines = await userDataResolver.userCuisines(context1);

  expect(categories.length).toEqual(1);
  expect(cuisines.length).toEqual(1);
  expect(categories[0].name).toEqual('Meat');
  expect(cuisines[0].name).toEqual('Dinner');

  categories = await userDataResolver.userCategories(context2);
  cuisines = await userDataResolver.userCuisines(context2);

  expect(categories.length).toEqual(1);
  expect(cuisines.length).toEqual(1);
  expect(categories[0].name).toEqual('Poultry');
  expect(cuisines[0].name).toEqual('Italian');
});

it('adds recipes with staged images', async () => {
  const imageOne = 'http://imageOne';
  const imageId = await imageService.stageImage({ url: imageOne });

  const recipe = await recipeResolver.addRecipe(
    {
      title: 'Test',
      author: user1,
      stagedImages: [{ id: imageId, order: 1 }],
    },
    context1
  );

  const recipeImages = (await recipe.images) || [];

  expect(recipeImages[0].url).toEqual(imageOne);

  const imageTwo = 'cheese.jpg';
  const secondImageId = await recipeResolver.stageImage({
    filename: imageTwo,
    mimetype: 'image/jpeg',
    encoding: '',
    createReadStream: () => createReadStream(path.join(__dirname, '../fixtures/images', imageTwo)),
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

  const editedRecipe = await recipeResolver.addRecipe(editedInput, context1);

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
