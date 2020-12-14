import { IconButton, IconButtonProps } from '@material-ui/core';
import { FC, ReactElement } from 'react';

interface HeaderActionProps extends IconButtonProps {
  icon?: ReactElement;
}

const HeaderAction: FC<HeaderActionProps> = ({ children, icon = children, ...props }) => {
  return (
    <IconButton color="inherit" {...props}>
      {icon}
    </IconButton>
  );
};

export default HeaderAction;
