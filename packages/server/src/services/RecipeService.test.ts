import ImageMeta from 'entities/ImageMeta';
import Recipe from 'entities/Recipe';
import User from 'entities/User';
import { createReadStream } from 'fs';
import fs from 'fs-extra';
import path from 'path';
import CategoryRepository from 'repositories/CategoryRepository';
import CuisineRepository from 'repositories/CuisineRepository';
import RecipeInput from 'resolvers/inputTypes/RecipeInput';
import db from 'test/db';
import config from '../config';
import FileService from './FileService';
import ImageService from './ImageService';
import RecipeService from './RecipeService';
import UserService from './UserService';

const email = 'me@email.com';
const plainTextPassword = 'password';
let user: User;

let imageService: ImageService;
let recipeService: RecipeService;
let categoryRepository: CategoryRepository;
let cuisineRepository: CuisineRepository;

let cuisineId: number;

beforeAll(async () => {
  const conn = await db;

  const userService = new UserService(conn.getRepository(User));
  user = await userService.create({
    email,
    plainTextPassword,
  });

  const fileService = new FileService();

  imageService = new ImageService(conn.getRepository(ImageMeta), fileService);
  categoryRepository = conn.getCustomRepository(CategoryRepository);
  cuisineRepository = conn.getCustomRepository(CuisineRepository);

  recipeService = new RecipeService(
    imageService,
    conn.getRepository(Recipe),
    categoryRepository,
    cuisineRepository
  );
});

afterAll(async () => (await db).dropDatabase());

it('creates a recipe and retrieves it', async () => {
  const newRecipe = await recipeService.save({
    title: 'Lamb',
    author: user,
    categories: [{ name: 'Meat' }],
    cuisines: [{ name: 'Dinner' }],
  });
  const foundRecipe = await recipeService.getById(newRecipe.id);
  const cuisines = await foundRecipe?.cuisines;
  cuisineId = (cuisines || [])[0].id;

  expect(newRecipe.id).toBeDefined();
  expect(foundRecipe?.title).toEqual('Lamb');
});

it('creates multiple recipes', async () => {
  const newRecipes = await recipeService.save([
    {
      title: 'Beef',
      author: user,
      categories: [{ name: 'Meat' }],
      cuisines: [{ id: cuisineId }],
    },
    {
      title: 'Chicken',
      author: user,
      categories: [{ name: 'Poultry' }],
      cuisines: [{ id: cuisineId }],
    },
    {
      title: 'Pork',
      author: user,
    },
  ]);
  const userRecipes = await recipeService.getAllByAuthor(user.id);
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

  const recipe = await recipeService.save({
    title: 'Test',
    author: user,
    stagedImages: [{ id: imageId, order: 1 }],
  });

  const recipeImages = (await recipe.images) || [];

  expect(recipeImages[0].url).toEqual(imageOne);

  const imageTwo = 'cheese.jpg';
  const secondImageId = await imageService.stageImage({
    stream: createReadStream(path.join(__dirname, '../test/fixtures', imageTwo)),
    mimetype: 'image/jpeg',
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

  const editedRecipe = await recipeService.save(editedInput);

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
