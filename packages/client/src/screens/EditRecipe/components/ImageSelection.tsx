import { Button } from '@material-ui/core';
import DeleteIconButton from 'components/Button/DeleteIconButton';
import Progress from 'components/Progress';
import useFile from 'hooks/useFile';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';
import { RecipeImageSelection, UploadStatus } from './imageSelectorReducer';

interface ImageSelectionProps {
  selection?: RecipeImageSelection;
  handleQueueFile?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: () => void;
}

const ImageSelection: React.FC<ImageSelectionProps> = ({
  selection,
  handleQueueFile,
  handleDelete,
  ...props
}) => {
  const dataUrl = useFile(selection?.file);
  const imgSrc = dataUrl || selection?.url;

  const overlay = selection ? (
    selection.status === UploadStatus.Staging ? (
      <div className="overlay always-shown">
        <Progress />
      </div>
    ) : selection.status === UploadStatus.Error ? (
      <div className="overlay always-shown">Error</div>
    ) : (
      <div className="overlay">
        <DeleteIconButton onClick={handleDelete} />
      </div>
    )
  ) : null;

  return (
    <div {...props}>
      {selection ? (
        <img src={imgSrc} alt="" />
      ) : (
        <>
          <input
            type="file"
            id="image-upload"
            multiple
            onChange={handleQueueFile}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            <Button component="span">Add Image</Button>
          </label>
        </>
      )}
      {overlay}
    </div>
  );
};

export default styled(ImageSelection)`
  flex: 0 0 40%;
  position: relative;
  max-width: 150px;
  height: 120px;
  margin-left: ${getSpacing(1)};

  &:first-of-type {
    margin-left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background-color: transparent;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay,
  .overlay.always-shown {
    pointer-events: auto;
    opacity: 1;
  }
`;
