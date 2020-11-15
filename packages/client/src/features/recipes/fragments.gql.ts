import gql from 'graphql-tag';

import type * as Types from '../types.gql';
export type IngredientFieldsFragment = {
  __typename?: 'Ingredient';
  id: number;
  quantity: number;
  measure?: Types.Maybe<string>;
  item: string;
};

export type StepFieldsFragment = { __typename?: 'Step'; id: number; description: string };

export type ImageFieldsFragment = {
  __typename?: 'ImageMeta';
  id: string;
  caption?: Types.Maybe<string>;
  url: string;
  order: number;
};

export type CategoryFieldsFragment = { __typename?: 'Category'; id: number; name: string };

export type CuisineFieldsFragment = { __typename?: 'Cuisine'; id: number; name: string };

export type RecipeFieldsFragment = {
  __typename?: 'Recipe';
  id: number;
  title: string;
  description?: Types.Maybe<string>;
  sourceUrl?: Types.Maybe<string>;
  prepTime?: Types.Maybe<number>;
  cookTime?: Types.Maybe<number>;
  totalTime: number;
  yield?: Types.Maybe<number>;
  images?: Types.Maybe<Array<{ __typename?: 'ImageMeta' } & ImageFieldsFragment>>;
  categories: Array<{ __typename?: 'Category' } & CategoryFieldsFragment>;
  cuisines: Array<{ __typename?: 'Cuisine' } & CuisineFieldsFragment>;
  ingredients: Array<{ __typename?: 'Ingredient' } & IngredientFieldsFragment>;
  steps: Array<{ __typename?: 'Step' } & StepFieldsFragment>;
};

export const ImageFieldsFragmentDoc = /*#__PURE__*/ gql`
  fragment ImageFields on ImageMeta {
    id
    caption
    url
    order
  }
`;
export const CategoryFieldsFragmentDoc = /*#__PURE__*/ gql`
  fragment CategoryFields on Category {
    id
    name
  }
`;
export const CuisineFieldsFragmentDoc = /*#__PURE__*/ gql`
  fragment CuisineFields on Cuisine {
    id
    name
  }
`;
export const IngredientFieldsFragmentDoc = /*#__PURE__*/ gql`
  fragment IngredientFields on Ingredient {
    id
    quantity
    measure
    item
  }
`;
export const StepFieldsFragmentDoc = /*#__PURE__*/ gql`
  fragment StepFields on Step {
    id
    description
  }
`;
export const RecipeFieldsFragmentDoc = /*#__PURE__*/ gql`
  fragment RecipeFields on Recipe {
    id
    title
    description
    sourceUrl
    images {
      ...ImageFields
    }
    prepTime
    cookTime
    totalTime
    yield
    categories {
      ...CategoryFields
    }
    cuisines {
      ...CuisineFields
    }
    ingredients {
      ...IngredientFields
    }
    steps {
      ...StepFields
    }
  }
  ${ImageFieldsFragmentDoc}
  ${CategoryFieldsFragmentDoc}
  ${CuisineFieldsFragmentDoc}
  ${IngredientFieldsFragmentDoc}
  ${StepFieldsFragmentDoc}
`;
