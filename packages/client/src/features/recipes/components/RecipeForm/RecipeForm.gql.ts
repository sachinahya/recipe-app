import gql from 'graphql-tag';
import * as Urql from 'urql';

import type * as Types from '../../../types.gql';
import type { RecipeFieldsFragment } from '../../fragments.gql';
import { RecipeFieldsFragmentDoc } from '../../fragments.gql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SaveRecipeMutationVariables = Types.Exact<{
  data: Types.RecipeInput;
}>;

export type SaveRecipeMutation = {
  __typename?: 'Mutation';
  addRecipe: { __typename?: 'Recipe' } & RecipeFieldsFragment;
};

export type RecipeFormDataQueryVariables = Types.Exact<{
  id: Types.Scalars['Float'];
}>;

export type RecipeFormDataQuery = {
  __typename?: 'Query';
  recipe?: Types.Maybe<{ __typename?: 'Recipe' } & RecipeFieldsFragment>;
};

export const SaveRecipeDocument = /*#__PURE__*/ gql`
  mutation saveRecipe($data: RecipeInput!) {
    addRecipe(data: $data) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

export function useSaveRecipeMutation() {
  return Urql.useMutation<SaveRecipeMutation, SaveRecipeMutationVariables>(SaveRecipeDocument);
}
export const RecipeFormDataDocument = /*#__PURE__*/ gql`
  query recipeFormData($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

export function useRecipeFormDataQuery(
  options: Omit<Urql.UseQueryArgs<RecipeFormDataQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<RecipeFormDataQuery>({ query: RecipeFormDataDocument, ...options });
}
