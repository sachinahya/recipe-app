import { Button } from '@material-ui/core';
import { ChangeEvent, FC, useRef } from 'react';
import styled from 'styled-components';
import { getBorderRadius } from 'styles/styleSelectors';

import ImageSelectionCell from './ImageSelectionCell';

export interface AddImageSelectionProps {
  onChange(evt: ChangeEvent): void;
}

const AddImageSelectionCell = styled.div`
  border: 1px dotted ${props => props.theme.palette.primary.main};
  border-radius: ${getBorderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AddImageSelection: FC<AddImageSelectionProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();

  return (
    <ImageSelectionCell>
      <AddImageSelectionCell>
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
      </AddImageSelectionCell>
    </ImageSelectionCell>
  );
};

export default AddImageSelection;
