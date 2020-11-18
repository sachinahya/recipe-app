import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import { FC } from 'react';

interface DeleteIconButtonProps extends IconButtonProps {
  iconProps?: SvgIconProps;
}

const DeleteIconButton: FC<DeleteIconButtonProps> = ({ iconProps, ...props }) => {
  return (
    <IconButton aria-label="Delete" {...props}>
      <DeleteIcon {...iconProps} />
    </IconButton>
  );
};

export default DeleteIconButton;
