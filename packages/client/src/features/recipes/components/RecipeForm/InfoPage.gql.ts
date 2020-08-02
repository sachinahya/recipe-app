import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import gql from 'graphql-tag';

import * as Types from '../../../types.gql';
import { CategoryFieldsFragment, CuisineFieldsFragment } from '../../fragments.gql';
import { CategoryFieldsFragmentDoc, CuisineFieldsFragmentDoc } from '../../fragments.gql';

export type UserCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserCategoriesQuery = {
  __typename?: 'Query';
  userCategories: Array<{ __typename?: 'Category' } & CategoryFieldsFragment>;
};

export type UserCuisinesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserCuisinesQuery = {
  __typename?: 'Query';
  userCuisines: Array<{ __typename?: 'Cuisine' } & CuisineFieldsFragment>;
};

export const UserCategoriesDocument = gql`
  query userCategories {
    userCategories {
      ...CategoryFields
    }
  }
  ${CategoryFieldsFragmentDoc}
`;

/**
 * __useUserCategoriesQuery__
 *
 * To run a query within a React component, call `useUserCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserCategoriesQuery, UserCategoriesQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserCategoriesQuery, UserCategoriesQueryVariables>(
    UserCategoriesDocument,
    baseOptions
  );
}
export function useUserCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserCategoriesQuery,
    UserCategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserCategoriesQuery, UserCategoriesQueryVariables>(
    UserCategoriesDocument,
    baseOptions
  );
}
export type UserCategoriesQueryHookResult = ReturnType<typeof useUserCategoriesQuery>;
export type UserCategoriesLazyQueryHookResult = ReturnType<typeof useUserCategoriesLazyQuery>;
export type UserCategoriesQueryResult = ApolloReactCommon.QueryResult<
  UserCategoriesQuery,
  UserCategoriesQueryVariables
>;
export const UserCuisinesDocument = gql`
  query userCuisines {
    userCuisines {
      ...CuisineFields
    }
  }
  ${CuisineFieldsFragmentDoc}
`;

/**
 * __useUserCuisinesQuery__
 *
 * To run a query within a React component, call `useUserCuisinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCuisinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCuisinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCuisinesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserCuisinesQuery, UserCuisinesQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserCuisinesQuery, UserCuisinesQueryVariables>(
    UserCuisinesDocument,
    baseOptions
  );
}
export function useUserCuisinesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCuisinesQuery, UserCuisinesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<UserCuisinesQuery, UserCuisinesQueryVariables>(
    UserCuisinesDocument,
    baseOptions
  );
}
export type UserCuisinesQueryHookResult = ReturnType<typeof useUserCuisinesQuery>;
export type UserCuisinesLazyQueryHookResult = ReturnType<typeof useUserCuisinesLazyQuery>;
export type UserCuisinesQueryResult = ApolloReactCommon.QueryResult<
  UserCuisinesQuery,
  UserCuisinesQueryVariables
>;
