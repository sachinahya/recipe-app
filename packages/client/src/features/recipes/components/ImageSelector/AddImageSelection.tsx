import { Button } from '@material-ui/core';
import { ChangeEvent, FC, useRef } from 'react';
import { getBorderRadius } from 'styles/styleSelectors';

import ImageSelectionCell from './ImageSelectionCell';

export interface AddImageSelectionProps {
  onChange(evt: ChangeEvent): void;
}

const AddImageSelection: FC<AddImageSelectionProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();

  return (
    <ImageSelectionCell>
      <div
        css={theme => ({
          border: `1px dotted ${theme.palette.primary.main}`,
          borderRadius: getBorderRadius(theme),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        })}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          onChange={onChange}
          style={{ display: 'none' }}
          accept="image/*"
          ref={inputRef}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" onClick={handleClick}>
            Add Image
          </Button>
        </label>
      </div>
    </ImageSelectionCell>
  );
};

export default AddImageSelection;
