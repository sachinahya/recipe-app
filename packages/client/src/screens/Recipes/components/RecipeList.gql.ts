import gql from 'graphql-tag';
import * as Urql from 'urql';

import type * as Types from '../../../features/types.gql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export const RecipesDocument = /*#__PURE__*/ gql`
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

export function useRecipesQuery(
  options: Omit<Urql.UseQueryArgs<RecipesQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<RecipesQuery>({ query: RecipesDocument, ...options });
}
