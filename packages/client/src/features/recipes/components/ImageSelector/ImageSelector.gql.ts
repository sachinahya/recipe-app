import * as Types from '../../../types.gql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UploadImageMutationVariables = {
  file: Types.Scalars['Upload'];
};

export type UploadImageMutation = { __typename?: 'Mutation'; stageImage: string };

export const UploadImageDocument = gql`
  mutation uploadImage($file: Upload!) {
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
