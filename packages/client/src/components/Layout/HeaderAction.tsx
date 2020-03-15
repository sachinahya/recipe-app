import { IconButton, IconButtonProps } from '@material-ui/core';
import React from 'react';

interface HeaderActionProps extends IconButtonProps {
  icon?: React.ReactElement;
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  children,
  icon = children,
  ...props
}) => {
  return (
    <IconButton color="inherit" {...props}>
      {icon}
    </IconButton>
  );
};

export default HeaderAction;
