import { readFile } from 'fs';
import glob from 'glob';
import { promisify } from 'util';
import Category from '../entities/Category';
import Cuisine from '../entities/Cuisine';
import Ingredient from '../entities/Ingredient';
import Recipe from '../entities/Recipe';
import Step from '../entities/Step';
import User from '../entities/User';
import logger from '@sachinahya/logger';
import ImageMeta from '../entities/ImageMeta';
import { v4 as uuid } from 'uuid';

const globPromise = promisify(glob);
const readFilePromise = promisify(readFile);

/* const units = [
  'g',
  'tsp',
  'tbsp',
  'ml',
  'pounds',
  'cup',
  'tablespoon',
  'tablespoons',
  'teaspoon',
  'teaspoons',
]; */

const ingredientRegex = /((?<quantity>[.\d]+)\s?(?<measure>(?:gram|g|tsp|tbsp|ml|pound|cup|tablespoon|tablespoon|teaspoon)s?)?)?(?<item>[a-zA-Z\d\s-]*)(?:\((?<notes>[a-zA-Z\s]*)\))?/;

const parseIngredient = (ingredient: string, index: number): Ingredient => {
  const match = ingredientRegex.exec(ingredient);

  const newIngredient = new Ingredient();
  newIngredient.id = index + 1;

  if (match && match.groups) {
    const { quantity, item, measure, notes } = match.groups;
    newIngredient.quantity = parseInt(quantity) || 0;
    newIngredient.measure = measure && measure.trim();
    newIngredient.item = item.trim();
    newIngredient.notes = notes && notes.trim();
  } else {
    newIngredient.quantity = 0;
    newIngredient.measure = 'item';
    newIngredient.item = ingredient;
  }

  return newIngredient;
};

const parseStep = (description: string, index: number): Step => {
  const newStep = new Step();
  newStep.id = index + 1;
  newStep.description = description;
  return newStep;
};

const createCategory = (name: string): Category[] => {
  name = name.trim();
  if (name) {
    const category = new Category();
    category.name = name;
    return [category];
  }

  return [];
};

const createCuisine = (name: string): Cuisine[] => {
  name = name.trim();
  if (name) {
    const cuisine = new Cuisine();
    cuisine.name = name;
    return [cuisine];
  }

  return [];
};

const createImage = (url?: string): ImageMeta[] | undefined => {
  if (url) {
    const image = new ImageMeta();
    image.id = uuid();
    image.url = url;
    image.order = 1;
    return [image];
  }
};

const extractNumericData = (str: string | undefined): number | undefined => {
  const matchNumeric = /(\d+)/;
  const matches = typeof str === 'string' && matchNumeric.exec(str);
  return matches && matches[1] ? parseInt(matches[1]) : undefined;
};

const parseRecipe = async (match: string, defaultUserId: User): Promise<Recipe> => {
  const data = await readFilePromise(match, 'utf-8');
  const [, json] = /<script.*>(.*)<\/script>/.exec(data) || [];
  if (!json) throw new Error('Cannot locate recipe data for ' + match);
  const recipe = JSON.parse(json);

  if (recipe.description.length >= 8000) {
    logger.info(recipe.name);
  }

  const newRecipe = new Recipe();
  newRecipe.title = recipe.name;
  newRecipe.author = defaultUserId;
  newRecipe.description = recipe.description;
  newRecipe.creationDate = new Date(recipe.datePublished);
  newRecipe.prepTime = extractNumericData(recipe.prepTime);
  newRecipe.cookTime = extractNumericData(recipe.cookTime);
  newRecipe.yield = extractNumericData(recipe.recipeYield);
  newRecipe.categories = createCategory(recipe.recipeCategory);
  newRecipe.cuisines = createCuisine(recipe.recipeCuisine);
  newRecipe.ingredients = recipe.recipeIngredient.map(parseIngredient);
  newRecipe.steps = recipe.recipeInstructions.map(parseStep);
  newRecipe.images = createImage(recipe.image[0]);
  newRecipe.sourceUrl = (recipe.author && recipe.author.name) || undefined;

  return newRecipe;
};

export const importRecipes = async (user1: User, user2: User): Promise<Recipe[]> => {
  const matches = await globPromise('./samples/*.html');
  const promises = matches.map((match, index) => parseRecipe(match, index % 2 ? user1 : user2));
  const recipes = await Promise.all(promises);

  // FIXME: Only import recipes that have images.
  return recipes.filter(recipe => !!recipe.images);
};
