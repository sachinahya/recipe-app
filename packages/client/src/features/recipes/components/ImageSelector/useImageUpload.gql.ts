import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../types.gql';
export type RequestUploadMutationVariables = Types.Exact<{
  mimeType: Types.Scalars['String'];
}>;

export type RequestUploadMutation = {
  __typename?: 'Mutation';
  requestUpload: {
    __typename?: 'SignedUploadRequest';
    expires: number;
    filename: string;
    signedUrl: string;
  };
};

export const RequestUploadDocument = gql`
  mutation requestUpload($mimeType: String!) {
    requestUpload(mimeType: $mimeType) {
      expires
      filename
      signedUrl
    }
  }
`;
export type RequestUploadMutationFn = Apollo.MutationFunction<
  RequestUploadMutation,
  RequestUploadMutationVariables
>;

/**
 * __useRequestUploadMutation__
 *
 * To run a mutation, you first call `useRequestUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestUploadMutation, { data, loading, error }] = useRequestUploadMutation({
 *   variables: {
 *      mimeType: // value for 'mimeType'
 *   },
 * });
 */
export function useRequestUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<RequestUploadMutation, RequestUploadMutationVariables>
) {
  return Apollo.useMutation<RequestUploadMutation, RequestUploadMutationVariables>(
    RequestUploadDocument,
    baseOptions
  );
}
export type RequestUploadMutationHookResult = ReturnType<typeof useRequestUploadMutation>;
export type RequestUploadMutationResult = Apollo.MutationResult<RequestUploadMutation>;
export type RequestUploadMutationOptions = Apollo.BaseMutationOptions<
  RequestUploadMutation,
  RequestUploadMutationVariables
>;
