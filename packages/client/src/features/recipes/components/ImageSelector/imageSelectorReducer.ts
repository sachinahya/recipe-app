import { ErrorAction, PayloadAction } from 'lib/actions';
import { InvalidActionError } from 'lib/errors';
import React from 'react';

import { ImageInput } from '../../../types.gql';

export enum ImageUploadStatus {
  Queued,
  Uploading,
  Uploaded,
  Error,
}

// Properties in an image that has been selected
export type ImageSelectionType = Omit<ImageInput, 'order'> & {
  clientId: string;
  status?: ImageUploadStatus;
  file?: File;
  error?: Error;
};

export type ReducerState = ImageSelectionType[];

export type ReducerActions =
  | PayloadAction<'ADD', { clientId: string; url?: string; file?: File }>
  | PayloadAction<'UPLOADING', { clientId: string }>
  | PayloadAction<'UPLOADED', { clientId: string; newFileName: string }>
  | ErrorAction<'ERROR', { clientId: string; error: Error }>
  | PayloadAction<'REMOVE', { clientId: string }>
  | PayloadAction<'CAPTION_CHANGE', { clientId: string; caption: string | undefined }>;

const imageSelectionReducer: React.Reducer<ReducerState, ReducerActions> = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return [
        ...state,
        {
          ...action.payload,
          status: action.payload.file && ImageUploadStatus.Queued,
        },
      ];
    }

    case 'UPLOADING':
      return state.map(item =>
        item.clientId === action.payload.clientId
          ? {
              ...item,
              status: ImageUploadStatus.Uploading,
            }
          : item
      );

    case 'UPLOADED':
      return state.map(item =>
        item.clientId === action.payload.clientId
          ? {
              ...item,
              filename: action.payload.newFileName,
              status: ImageUploadStatus.Uploaded,
            }
          : item
      );

    case 'REMOVE':
      return state.filter(item => item.clientId !== action.payload.clientId);

    case 'ERROR':
      return state.map(item =>
        item.clientId === action.payload.clientId
          ? {
              ...item,
              status: ImageUploadStatus.Error,
              error: action.payload.error,
            }
          : item
      );

    case 'CAPTION_CHANGE':
      return state.map(item =>
        item.clientId === action.payload.clientId
          ? {
              ...item,
              caption: action.payload.caption,
            }
          : item
      );

    default:
      throw new InvalidActionError(action);
  }
};

export default imageSelectionReducer;
