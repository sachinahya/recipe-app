import gql from 'graphql-tag';
import * as Urql from 'urql';

import type { RecipeFieldsFragment } from '../../../../features/recipes/fragments.gql';
import { RecipeFieldsFragmentDoc } from '../../../../features/recipes/fragments.gql';
import type * as Types from '../../../../features/types.gql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RecipeQueryVariables = Types.Exact<{
  id: Types.Scalars['Float'];
}>;

export type RecipeQuery = {
  __typename?: 'Query';
  recipe?: Types.Maybe<{ __typename?: 'Recipe' } & RecipeFieldsFragment>;
};

export const RecipeDocument = /*#__PURE__*/ gql`
  query recipe($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

export function useRecipeQuery(
  options: Omit<Urql.UseQueryArgs<RecipeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<RecipeQuery>({ query: RecipeDocument, ...options });
}
