import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

export interface TextInputProps {
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onClear?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ onClear, ...props }) => {
  const textFieldProps = Object.assign(
    {},
    props,
    onClear && {
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton title="Clear selected item" onClick={onClear}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      },
    }
  );

  return <TextField margin="normal" {...textFieldProps} />;
};

export default TextInput;
