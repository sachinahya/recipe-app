import Button, { ButtonProps } from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { FC } from 'react';

const AddButton: FC<ButtonProps> = ({ children = 'Add', ...props }) => {
  return (
    <Button {...props} startIcon={<AddIcon />}>
      {children}
    </Button>
  );
};

export default AddButton;
