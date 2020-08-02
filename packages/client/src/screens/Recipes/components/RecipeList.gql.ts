import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import gql from 'graphql-tag';

import * as Types from '../../../features/types.gql';

export type RecipesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type RecipesQuery = {
  __typename?: 'Query';
  recipes: Array<{
    __typename?: 'Recipe';
    id: number;
    title: string;
    description?: Types.Maybe<string>;
    totalTime: number;
    images?: Types.Maybe<Array<{ __typename?: 'ImageMeta'; url: string }>>;
    categories: Array<{ __typename?: 'Category'; name: string }>;
  }>;
};

export const RecipesDocument = gql`
  query recipes {
    recipes {
      id
      title
      description
      totalTime
      images {
        url
      }
      categories {
        name
      }
    }
  }
`;

/**
 * __useRecipesQuery__
 *
 * To run a query within a React component, call `useRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<RecipesQuery, RecipesQueryVariables>
) {
  return ApolloReactHooks.useQuery<RecipesQuery, RecipesQueryVariables>(
    RecipesDocument,
    baseOptions
  );
}
export function useRecipesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipesQuery, RecipesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<RecipesQuery, RecipesQueryVariables>(
    RecipesDocument,
    baseOptions
  );
}
export type RecipesQueryHookResult = ReturnType<typeof useRecipesQuery>;
export type RecipesLazyQueryHookResult = ReturnType<typeof useRecipesLazyQuery>;
export type RecipesQueryResult = ApolloReactCommon.QueryResult<RecipesQuery, RecipesQueryVariables>;
