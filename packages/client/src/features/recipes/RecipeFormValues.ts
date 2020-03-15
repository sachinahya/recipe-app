import { Recipe, RecipeInput } from 'features/graphql/types.generated';
import { array, object, string, StringSchema, TransformFunction } from 'yup';

export type FormValues<T> = {
  [K in keyof T]: Array<any> extends T[K] ? any[] : any;
};

const emptyStringToUndefined: TransformFunction<StringSchema> = function(value) {
  if (this.isType(value)) {
    return value.trim() === '' ? undefined : value.trim();
  }

  return value;
};

/* const emptyStringToUndefinedNumeric: TransformFunction<NumberSchema<
  number
>> = function(value, originalValue) {
  // If it's already a number we return it
  if (this.isType(value)) return value;
  // If it's an empty string, return undefined
  if (typeof originalValue == 'string' && originalValue.trim() === '') {
    return undefined;
  }
  // Anything else, return the initial invalid value
  return originalValue;
}; */

const emptyString = () => {
  return string().transform(emptyStringToUndefined);
};

/* const emptyNumber = () => {
  return number().transform(emptyStringToUndefinedNumeric);
}; */

export const schema = object().shape<FormValues<RecipeInput>>({
  title: emptyString().required(),
  description: emptyString(),
  imageUrl: emptyString(),
  // prepTime: emptyNumber(),
  // cookTime: emptyNumber(),
  // yield: emptyNumber(),
  sourceUrl: emptyString(),
  categories: array()
    .of(emptyString())
    .compact(),
});

/* const emptyStringsToUndefined = <T>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      let newValue = value;
      if (typeof value == 'object') newValue = emptyStringsToUndefined(value);
      if (typeof value == 'string')
        newValue = value.trim() === '' ? undefined : value.trim();
      return [key, newValue];
    })
  );
}; */

const trimStringValue = (str: string | null | undefined): string | undefined =>
  str ? str.trim() : undefined;

const stringToNumber = (str: string | null | undefined): number | undefined =>
  str ? Number(str) : undefined;

const numberToString = (num: number | null | undefined): string => (num ? num.toString() : '');

const toIdObject = (str: string | null | undefined): { id: number } => ({
  id: Number(str),
});

export const convertFromFormValues = (values: FormValues<RecipeInput>): RecipeInput => {
  return {
    id: values.id ? Number(values.id) : undefined,
    title: values.title.trim(),
    description: trimStringValue(values.description),
    prepTime: stringToNumber(values.prepTime),
    cookTime: stringToNumber(values.cookTime),
    yield: stringToNumber(values.yield),
    imageUrl: trimStringValue(values.imageUrl),
    stagedImages: values.stagedImages?.map(x => ({
      id: x.id,
      order: stringToNumber(x.order) || -1,
    })),
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
  };
};

export const convertToFormValues = (values: Partial<Recipe> = {}): FormValues<RecipeInput> => {
  return {
    id: numberToString(values.id),
    title: values.title || '',
    description: values.description || '',
    prepTime: numberToString(values.prepTime),
    cookTime: numberToString(values.cookTime),
    yield: numberToString(values.yield),
    imageUrl: values.imageUrl || '',
    stagedImages: (values.images /* || (values as any).stagedImages */ || []).map((x: any) => ({
      id: x.id,
      order: x.order.toString(),
      url: x.url,
    })),
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
  };
};

/* const convertToFormValues = (values:RecipeInput): FormValues<RecipeInput> => {
  const values2: {
    id?: number,
    type: boolean
  } = {
    id: 2,
    type: true
  }
  const  eee = numbersToStrings(values2)
  const newValues : FormValues<RecipeInput> = {
    ...numbersToStrings(undefinedToEmptyStrings(values)),
    categories: (values.categories || []).map(cat => cat.id.)
  };

  return newValues;
} */
