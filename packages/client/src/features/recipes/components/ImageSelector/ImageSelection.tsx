import { Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFile } from '@sachinahya/hooks';
import DeleteIconButton from 'components/Button/DeleteIconButton';
import Progress from 'components/Progress';
import { ChangeEvent, FC } from 'react';
import { spacing } from 'styles/styleSelectors';

import ImageSelectionCell from './ImageSelectionCell';
import ImageSelectionOverlay from './ImageSelectionOverlay';
import { ImageSelectionType, ImageUploadStatus } from './imageSelectorReducer';

interface ImageSelectionProps {
  type: 'url' | 'file';
  selection: ImageSelectionType;
  handleQueueFile?(evt: ChangeEvent<HTMLInputElement>): void;
  handleDelete?(): void;
  handleCaptionChange?(newCaption: string): void;
}

const ImageSelection: FC<ImageSelectionProps> = ({
  selection: { file, url, status, caption = '', error },
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
      <div
        css={{
          position: 'relative',
          width: 150,

          img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <img src={imgSrc} alt={caption} />
        {overlay}
      </div>
      <div
        css={theme => ({
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: spacing(1)(theme),
        })}
      >
        <TextField
          fullWidth
          size="small"
          label="Caption"
          value={caption}
          onChange={evt => handleCaptionChange?.(evt.target.value)}
        />
        {status !== ImageUploadStatus.Uploading && (
          <Button
            css={{ marginTop: 'auto' }}
            color="primary"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </ImageSelectionCell>
  );
};

export default ImageSelection;
