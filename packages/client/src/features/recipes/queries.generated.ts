import * as Types from '../graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type IngredientFieldsFragment = {
  __typename?: 'Ingredient';
  id: number;
  quantity: number;
  measure: Types.Maybe<string>;
  item: string;
};

export type StepFieldsFragment = { __typename?: 'Step'; id: number; description: string };

export type ImageFieldsFragment = {
  __typename?: 'ImageMeta';
  id: string;
  url: string;
  order: Types.Maybe<number>;
};

export type CategoryFieldsFragment = { __typename?: 'Category'; id: number; name: string };

export type CuisineFieldsFragment = { __typename?: 'Cuisine'; id: number; name: string };

export type RecipeFieldsFragment = {
  __typename?: 'Recipe';
  id: number;
  title: string;
  description: Types.Maybe<string>;
  sourceUrl: Types.Maybe<string>;
  prepTime: Types.Maybe<number>;
  cookTime: Types.Maybe<number>;
  yield: Types.Maybe<number>;
  images: Types.Maybe<Array<{ __typename?: 'ImageMeta' } & ImageFieldsFragment>>;
  categories: Array<{ __typename?: 'Category' } & CategoryFieldsFragment>;
  cuisines: Array<{ __typename?: 'Cuisine' } & CuisineFieldsFragment>;
  ingredients: Array<{ __typename?: 'Ingredient' } & IngredientFieldsFragment>;
  steps: Array<{ __typename?: 'Step' } & StepFieldsFragment>;
};

export type AddRecipeMutationVariables = {
  data: Types.RecipeInput;
};

export type AddRecipeMutation = {
  __typename?: 'Mutation';
  addRecipe: { __typename?: 'Recipe' } & RecipeFieldsFragment;
};

export type UploadImageMutationVariables = {
  file: Types.Scalars['Upload'];
};

export type UploadImageMutation = { __typename?: 'Mutation'; stageImage: string };

export type UserCategoriesQueryVariables = {};

export type UserCategoriesQuery = {
  __typename?: 'Query';
  userCategories: Array<{ __typename?: 'Category' } & CategoryFieldsFragment>;
};

export type UserCuisinesQueryVariables = {};

export type UserCuisinesQuery = {
  __typename?: 'Query';
  userCuisines: Array<{ __typename?: 'Cuisine' } & CuisineFieldsFragment>;
};

export type RecipeSingleQueryVariables = {
  id: Types.Scalars['Float'];
};

export type RecipeSingleQuery = {
  __typename?: 'Query';
  recipe: Types.Maybe<{ __typename?: 'Recipe' } & RecipeFieldsFragment>;
};

export type RecipeListQueryVariables = {};

export type RecipeListQuery = {
  __typename?: 'Query';
  recipes: Array<{ __typename?: 'Recipe' } & RecipeFieldsFragment>;
};

export const ImageFieldsFragmentDoc = gql`
  fragment ImageFields on ImageMeta {
    id
    url
    order
  }
`;
export const CategoryFieldsFragmentDoc = gql`
  fragment CategoryFields on Category {
    id
    name
  }
`;
export const CuisineFieldsFragmentDoc = gql`
  fragment CuisineFields on Cuisine {
    id
    name
  }
`;
export const IngredientFieldsFragmentDoc = gql`
  fragment IngredientFields on Ingredient {
    id
    quantity
    measure
    item
  }
`;
export const StepFieldsFragmentDoc = gql`
  fragment StepFields on Step {
    id
    description
  }
`;
export const RecipeFieldsFragmentDoc = gql`
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
export const AddRecipeDocument = gql`
  mutation AddRecipe($data: RecipeInput!) {
    addRecipe(data: $data) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;
export type AddRecipeMutationFn = ApolloReactCommon.MutationFunction<
  AddRecipeMutation,
  AddRecipeMutationVariables
>;

/**
 * __useAddRecipeMutation__
 *
 * To run a mutation, you first call `useAddRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecipeMutation, { data, loading, error }] = useAddRecipeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddRecipeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<AddRecipeMutation, AddRecipeMutationVariables>
) {
  return ApolloReactHooks.useMutation<AddRecipeMutation, AddRecipeMutationVariables>(
    AddRecipeDocument,
    baseOptions
  );
}
export type AddRecipeMutationHookResult = ReturnType<typeof useAddRecipeMutation>;
export type AddRecipeMutationResult = ApolloReactCommon.MutationResult<AddRecipeMutation>;
export type AddRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddRecipeMutation,
  AddRecipeMutationVariables
>;
export const UploadImageDocument = gql`
  mutation UploadImage($file: Upload!) {
    stageImage(file: $file)
  }
`;
export type UploadImageMutationFn = ApolloReactCommon.MutationFunction<
  UploadImageMutation,
  UploadImageMutationVariables
>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UploadImageMutation,
    UploadImageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<UploadImageMutation, UploadImageMutationVariables>(
    UploadImageDocument,
    baseOptions
  );
}
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = ApolloReactCommon.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UploadImageMutation,
  UploadImageMutationVariables
>;
export const UserCategoriesDocument = gql`
  query UserCategories {
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
  query UserCuisines {
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
export const RecipeSingleDocument = gql`
  query RecipeSingle($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

/**
 * __useRecipeSingleQuery__
 *
 * To run a query within a React component, call `useRecipeSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeSingleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeSingleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeSingleQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeSingleQuery, RecipeSingleQueryVariables>
) {
  return ApolloReactHooks.useQuery<RecipeSingleQuery, RecipeSingleQueryVariables>(
    RecipeSingleDocument,
    baseOptions
  );
}
export function useRecipeSingleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeSingleQuery, RecipeSingleQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<RecipeSingleQuery, RecipeSingleQueryVariables>(
    RecipeSingleDocument,
    baseOptions
  );
}
export type RecipeSingleQueryHookResult = ReturnType<typeof useRecipeSingleQuery>;
export type RecipeSingleLazyQueryHookResult = ReturnType<typeof useRecipeSingleLazyQuery>;
export type RecipeSingleQueryResult = ApolloReactCommon.QueryResult<
  RecipeSingleQuery,
  RecipeSingleQueryVariables
>;
export const RecipeListDocument = gql`
  query RecipeList {
    recipes {
      ...RecipeFields
    }
  }
  ${RecipeFieldsFragmentDoc}
`;

/**
 * __useRecipeListQuery__
 *
 * To run a query within a React component, call `useRecipeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipeListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeListQuery, RecipeListQueryVariables>
) {
  return ApolloReactHooks.useQuery<RecipeListQuery, RecipeListQueryVariables>(
    RecipeListDocument,
    baseOptions
  );
}
export function useRecipeListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeListQuery, RecipeListQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<RecipeListQuery, RecipeListQueryVariables>(
    RecipeListDocument,
    baseOptions
  );
}
export type RecipeListQueryHookResult = ReturnType<typeof useRecipeListQuery>;
export type RecipeListLazyQueryHookResult = ReturnType<typeof useRecipeListLazyQuery>;
export type RecipeListQueryResult = ApolloReactCommon.QueryResult<
  RecipeListQuery,
  RecipeListQueryVariables
>;
