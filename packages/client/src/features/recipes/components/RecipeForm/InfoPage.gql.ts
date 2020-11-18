import type * as Types from '../../../types.gql';

import type { CategoryFieldsFragment, CuisineFieldsFragment } from '../../fragments.gql';
import gql from 'graphql-tag';
import { CategoryFieldsFragmentDoc, CuisineFieldsFragmentDoc } from '../../fragments.gql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UserCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserCategoriesQuery = { __typename?: 'Query', userCategories: Array<(
    { __typename?: 'Category' }
    & CategoryFieldsFragment
  )> };

export type UserCuisinesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserCuisinesQuery = { __typename?: 'Query', userCuisines: Array<(
    { __typename?: 'Cuisine' }
    & CuisineFieldsFragment
  )> };


export const UserCategoriesDocument = /*#__PURE__*/ gql`
    query userCategories {
  userCategories {
    ...CategoryFields
  }
}
    ${CategoryFieldsFragmentDoc}`;

export function useUserCategoriesQuery(options: Omit<Urql.UseQueryArgs<UserCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserCategoriesQuery>({ query: UserCategoriesDocument, ...options });
};
export const UserCuisinesDocument = /*#__PURE__*/ gql`
    query userCuisines {
  userCuisines {
    ...CuisineFields
  }
}
    ${CuisineFieldsFragmentDoc}`;

export function useUserCuisinesQuery(options: Omit<Urql.UseQueryArgs<UserCuisinesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserCuisinesQuery>({ query: UserCuisinesDocument, ...options });
};