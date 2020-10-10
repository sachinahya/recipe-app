import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import { RecipeFieldsFragment } from '../../../../features/recipes/fragments.gql';
import { RecipeFieldsFragmentDoc } from '../../../../features/recipes/fragments.gql';
import * as Types from '../../../../features/types.gql';
export type RecipeQueryVariables = Types.Exact<{
  id: Types.Scalars['Float'];
}>;

export type RecipeQuery = {
  __typename?: 'Query';
  recipe?: Types.Maybe<{ __typename?: 'Recipe' } & RecipeFieldsFragment>;
};

export const RecipeDocument = gql`
  query recipe($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

/**
 * __useRecipeQuery__
 *
 * To run a query within a React component, call `useRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeQuery(
  baseOptions?: Apollo.QueryHookOptions<RecipeQuery, RecipeQueryVariables>
) {
  return Apollo.useQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, baseOptions);
}
export function useRecipeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RecipeQuery, RecipeQueryVariables>
) {
  return Apollo.useLazyQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, baseOptions);
}
export type RecipeQueryHookResult = ReturnType<typeof useRecipeQuery>;
export type RecipeLazyQueryHookResult = ReturnType<typeof useRecipeLazyQuery>;
export type RecipeQueryResult = Apollo.QueryResult<RecipeQuery, RecipeQueryVariables>;
