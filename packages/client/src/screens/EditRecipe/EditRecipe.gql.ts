import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  RecipeFieldsFragment,
  RecipeFieldsFragmentDoc,
} from '../../features/recipes/fragments.gql';
import * as Types from '../../features/types.gql';

export type SaveRecipeMutationVariables = {
  data: Types.RecipeInput;
};

export type SaveRecipeMutation = {
  __typename?: 'Mutation';
  addRecipe: { __typename?: 'Recipe' } & RecipeFieldsFragment;
};

export type RecipeFormDataQueryVariables = {
  id: Types.Scalars['Float'];
};

export type RecipeFormDataQuery = {
  __typename?: 'Query';
  recipe: Types.Maybe<{ __typename?: 'Recipe' } & RecipeFieldsFragment>;
};

export const SaveRecipeDocument = gql`
  mutation saveRecipe($data: RecipeInput!) {
    addRecipe(data: $data) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;
export type SaveRecipeMutationFn = ApolloReactCommon.MutationFunction<
  SaveRecipeMutation,
  SaveRecipeMutationVariables
>;

/**
 * __useSaveRecipeMutation__
 *
 * To run a mutation, you first call `useSaveRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveRecipeMutation, { data, loading, error }] = useSaveRecipeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveRecipeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SaveRecipeMutation,
    SaveRecipeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SaveRecipeMutation, SaveRecipeMutationVariables>(
    SaveRecipeDocument,
    baseOptions
  );
}
export type SaveRecipeMutationHookResult = ReturnType<typeof useSaveRecipeMutation>;
export type SaveRecipeMutationResult = ApolloReactCommon.MutationResult<SaveRecipeMutation>;
export type SaveRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SaveRecipeMutation,
  SaveRecipeMutationVariables
>;
export const RecipeFormDataDocument = gql`
  query recipeFormData($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

/**
 * __useRecipeFormDataQuery__
 *
 * To run a query within a React component, call `useRecipeFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeFormDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeFormDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeFormDataQuery, RecipeFormDataQueryVariables>
) {
  return ApolloReactHooks.useQuery<RecipeFormDataQuery, RecipeFormDataQueryVariables>(
    RecipeFormDataDocument,
    baseOptions
  );
}
export function useRecipeFormDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RecipeFormDataQuery,
    RecipeFormDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<RecipeFormDataQuery, RecipeFormDataQueryVariables>(
    RecipeFormDataDocument,
    baseOptions
  );
}
export type RecipeFormDataQueryHookResult = ReturnType<typeof useRecipeFormDataQuery>;
export type RecipeFormDataLazyQueryHookResult = ReturnType<typeof useRecipeFormDataLazyQuery>;
export type RecipeFormDataQueryResult = ApolloReactCommon.QueryResult<
  RecipeFormDataQuery,
  RecipeFormDataQueryVariables
>;
