import { Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFile } from '@sachinahya/hooks';
import DeleteIconButton from 'components/Button/DeleteIconButton';
import Progress from 'components/Progress';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

import ImageSelectionCell from './ImageSelectionCell';
import ImageSelectionOverlay from './ImageSelectionOverlay';
import { ImageSelectionType, ImageUploadStatus } from './imageSelectorReducer';

interface ImageSelectionProps {
  type: 'url' | 'file';
  selection: ImageSelectionType;
  handleQueueFile?(evt: React.ChangeEvent<HTMLInputElement>): void;
  handleDelete?(): void;
  handleCaptionChange?(newCaption: string): void;
}

const ImageSelection: React.FC<ImageSelectionProps> = ({
  selection: { clientId, file, url, status, caption = '', error },
  handleQueueFile,
  handleDelete,
  handleCaptionChange,
  ...props
}) => {
  const dataUrl = useFile(file);
  const imgSrc = dataUrl || url || undefined;

  const overlay =
    status != null ? (
      status === ImageUploadStatus.Uploading ? (
        <ImageSelectionOverlay alwaysShown>
          <Progress />
        </ImageSelectionOverlay>
      ) : status === ImageUploadStatus.Error ? (
        <ImageSelectionOverlay alwaysShown>{JSON.stringify(error?.message)}</ImageSelectionOverlay>
      ) : (
        <ImageSelectionOverlay>
          <DeleteIconButton onClick={handleDelete} />
        </ImageSelectionOverlay>
      )
    ) : null;

  return (
    <ImageSelectionCell {...props}>
      <ImageFigure>
        <img src={imgSrc} alt={caption} />
        {overlay}
      </ImageFigure>
      <ImageDescription>
        <TextField
          fullWidth
          size="small"
          label="Caption"
          value={caption}
          onChange={evt => handleCaptionChange?.(evt.target.value)}
        />
        {status !== ImageUploadStatus.Uploading && (
          <DeleteButton
            color="primary"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </DeleteButton>
        )}
      </ImageDescription>
    </ImageSelectionCell>
  );
};

const ImageFigure = styled.div`
  position: relative;
  width: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageDescription = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${getSpacing(1)};
`;

const DeleteButton = styled(Button)`
  margin-top: auto;
`;

export default ImageSelection;
