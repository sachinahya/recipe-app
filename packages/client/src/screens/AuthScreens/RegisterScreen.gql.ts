import * as Types from '../../features/types.gql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type RegisterUserMutationVariables = {
  newUser: Types.NewUserInput;
};

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'User'; email: string };
};

export type CreatedUserQueryVariables = {};

export type CreatedUserQuery = {
  __typename?: 'Query';
  currentUser: Types.Maybe<{ __typename?: 'User'; email: string }>;
};

export const RegisterUserDocument = gql`
  mutation registerUser($newUser: NewUserInput!) {
    register(newUser: $newUser) {
      email
    }
  }
`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument,
    baseOptions
  );
}
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const CreatedUserDocument = gql`
  query createdUser {
    currentUser {
      email
    }
  }
`;

/**
 * __useCreatedUserQuery__
 *
 * To run a query within a React component, call `useCreatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreatedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreatedUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CreatedUserQuery, CreatedUserQueryVariables>
) {
  return ApolloReactHooks.useQuery<CreatedUserQuery, CreatedUserQueryVariables>(
    CreatedUserDocument,
    baseOptions
  );
}
export function useCreatedUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CreatedUserQuery, CreatedUserQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<CreatedUserQuery, CreatedUserQueryVariables>(
    CreatedUserDocument,
    baseOptions
  );
}
export type CreatedUserQueryHookResult = ReturnType<typeof useCreatedUserQuery>;
export type CreatedUserLazyQueryHookResult = ReturnType<typeof useCreatedUserLazyQuery>;
export type CreatedUserQueryResult = ApolloReactCommon.QueryResult<
  CreatedUserQuery,
  CreatedUserQueryVariables
>;
