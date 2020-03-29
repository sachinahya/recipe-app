import { ErrorAction, PayloadAction } from 'lib/actions';
import { InvalidActionError } from 'lib/errors';
import React from 'react';

export enum UploadStatus {
  Queued,
  Staging,
  Staged,
  Uploaded,
  Error,
}

export interface RecipeImageSelection {
  id: string;
  file?: File;
  url: string;
  status: UploadStatus;
}

export type ReducerState = RecipeImageSelection[];

export type ReducerActions =
  | PayloadAction<'QUEUED', { file: File }>
  | PayloadAction<'STAGING', string>
  | PayloadAction<'STAGED', { url: string; newId: string }>
  | PayloadAction<'UNSTAGE', string>
  | ErrorAction<'ERROR', { id: string; error: Error }>;

const imageSelectionReducer: React.Reducer<ReducerState, ReducerActions> = (state, action) => {
  switch (action.type) {
    case 'QUEUED': {
      return [
        ...state,
        {
          id: '',
          url: action.payload.file.name,
          file: action.payload.file,
          status: UploadStatus.Queued,
        },
      ];
    }

    case 'STAGING':
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            status: UploadStatus.Staging,
          };
        }
        return item;
      });

    case 'STAGED':
      return state.map(item => {
        if (item.url === action.payload.url) {
          return {
            ...item,
            id: action.payload.newId,
            status: UploadStatus.Staged,
          };
        }
        return item;
      });

    case 'UNSTAGE': {
      return state.filter(item => item.id !== action.payload);
    }

    case 'ERROR':
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            status: UploadStatus.Error,
          };
        }
        return item;
      });

    default:
      throw new InvalidActionError(action);
  }
};

export default imageSelectionReducer;
