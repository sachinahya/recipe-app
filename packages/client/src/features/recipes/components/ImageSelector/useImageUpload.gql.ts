import gql from 'graphql-tag';
import * as Urql from 'urql';

import type * as Types from '../../../types.gql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export const RequestUploadDocument = /*#__PURE__*/ gql`
  mutation requestUpload($mimeType: String!) {
    requestUpload(mimeType: $mimeType) {
      expires
      filename
      signedUrl
    }
  }
`;

export function useRequestUploadMutation() {
  return Urql.useMutation<RequestUploadMutation, RequestUploadMutationVariables>(
    RequestUploadDocument
  );
}
