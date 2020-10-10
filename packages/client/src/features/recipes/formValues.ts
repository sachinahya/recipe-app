import {
  emptyString,
  FormValues,
  numberToString,
  stringToNumber,
  toIdObject,
  trimStringValue,
} from 'features/forms/formValues';
import { NewStepInput, Recipe, RecipeInput } from 'features/types.gql';
import { array, object } from 'yup';

export type RecipeFormValues = FormValues<RecipeInput>;

export const schema = object().shape<RecipeFormValues>({
  title: emptyString().required(),
  description: emptyString(),
  imageUrl: emptyString(),
  sourceUrl: emptyString(),
  categories: array().of(emptyString()).compact(),
});

export const convertFromFormValues = (values: RecipeFormValues): RecipeInput => {
  return {
    id: values.id ? Number(values.id) : undefined,
    title: values.title.trim(),
    description: trimStringValue(values.description),
    prepTime: stringToNumber(values.prepTime),
    cookTime: stringToNumber(values.cookTime),
    yield: stringToNumber(values.yield),
    imageUrl: trimStringValue(values.imageUrl),
    images: values.images,
    sourceUrl: trimStringValue(values.sourceUrl),
    categories: values.categories ? values.categories.map(toIdObject) : undefined,
    cuisines: values.cuisines ? values.cuisines.map(toIdObject) : undefined,
    ingredients: values.ingredients
      ? values.ingredients.map(x => ({
          id: Number(x.id),
          item: trimStringValue(x.item) || '',
          quantity: Number(x.quantity),
          group: trimStringValue(x.group),
          measure: trimStringValue(x.measure),
        }))
      : undefined,
    steps: values.steps
      ? values.steps.map<NewStepInput>(x => ({
          id: x.id,
          description: x.description,
        }))
      : undefined,
  };
};

export const convertToFormValues = (values: Partial<Recipe> = {}): RecipeFormValues => {
  return {
    id: numberToString(values.id),
    title: values.title || '',
    description: values.description || '',
    prepTime: numberToString(values.prepTime),
    cookTime: numberToString(values.cookTime),
    yield: numberToString(values.yield),
    imageUrl: values.imageUrl || '',
    images: values.images || [],
    sourceUrl: values.sourceUrl || '',
    categories: (values.categories || []).map(x => x.id.toString()),
    cuisines: (values.cuisines || []).map(x => x.id.toString()),
    ingredients: (values.ingredients || []).map(x => ({
      id: numberToString(x.id),
      item: x.item || '',
      quantity: numberToString(x.quantity),
      group: x.group || '',
      measure: x.measure || '',
    })),
    steps: (values.steps || []).map(x => ({
      id: x.id,
      description: x.description,
    })),
  };
};
