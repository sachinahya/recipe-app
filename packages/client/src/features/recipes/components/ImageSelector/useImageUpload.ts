import gql from 'graphql-tag';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  ImageSelectionType,
  ImageUploadStatus,
  ReducerActions,
  ReducerState,
} from './imageSelectorReducer';
import { useRequestUploadMutation } from './useImageUpload.gql';

// Requests a signed URL that will be used to upload the image.
const REQUEST_UPLOAD_MUTATION = gql`
  mutation requestUpload($mimeType: String!) {
    requestUpload(mimeType: $mimeType) {
      expires
      filename
      signedUrl
    }
  }
`;

// Uploads the image to the received signed URL.
const uploadImage = async (signedUrl: string, mimeType: string, file: File): Promise<void> => {
  const response = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': mimeType,
    },
    body: file,
  });

  const xml = await response.text();
  console.log(xml);

  if (!response.ok) throw new Error(`Response not OK, returned HTTP status ${response.status}.`);
};

const useImageUpload = (selectedImages: ReducerState, dispatch: React.Dispatch<ReducerActions>) => {
  const [, requestUpload] = useRequestUploadMutation();

  const handleUpload = React.useCallback(
    async (input: ImageSelectionType): Promise<void> => {
      if (!input.file) return;
      const clientId = input.clientId;

      try {
        dispatch({ type: 'UPLOADING', payload: { ...input, clientId } });

        // Request a signed URL
        const { data: uploadInfo, error } = await requestUpload({
          mimeType: input.file.type,
        });

        if (error) {
          dispatch({
            type: 'ERROR',
            payload: {
              clientId,
              error: new Error(error.graphQLErrors.map(err => err.message).join('. ')),
            },
            error: true,
          });
          return;
        }

        if (uploadInfo?.requestUpload) {
          // Upload the image
          await uploadImage(uploadInfo.requestUpload.signedUrl, input.file.type, input.file);
          dispatch({
            type: 'UPLOADED',
            payload: { clientId, newFileName: uploadInfo.requestUpload.filename },
          });
        }
      } catch (error) {
        dispatch({ type: 'ERROR', payload: { clientId, error }, error: true });
      }
    },
    [dispatch, requestUpload]
  );

  React.useEffect(() => {
    // Look for queued images and call upload mutation.
    const imagesToUpload = selectedImages.filter(
      x => x.status === ImageUploadStatus.Queued && x.file
    );

    if (imagesToUpload.length) {
      Promise.all(imagesToUpload.map(img => handleUpload(img)))
        .then(() => console.log(`Processed ${imagesToUpload.length} images.`))
        .catch(err => console.error('Error uploading images', err));
    }
  }, [handleUpload, selectedImages]);

  return React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const files = evt.target.files;
      if (files) {
        [...files].forEach(file =>
          dispatch({ type: 'ADD', payload: { clientId: uuidv4(), file } })
        );
      }
    },
    [dispatch]
  );
};

export default useImageUpload;
