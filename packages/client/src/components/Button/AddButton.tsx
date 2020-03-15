import Button, { ButtonProps } from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const AddButton: React.FC<ButtonProps> = ({ children = 'Add', ...props }) => {
  return (
    <Button {...props} startIcon={<AddIcon />}>
      {children}
    </Button>
  );
};

export default AddButton;
