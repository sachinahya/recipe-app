import {
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import MuiListItem, {
  ListItemProps as MuiListItemProps,
} from '@material-ui/core/ListItem';
import React from 'react';

interface ListItemProps extends MuiListItemProps {
  icon?: React.ReactElement;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  icon,
  primary = children,
  secondary,
  secondaryAction,
  ...listItemProps
}) => {
  return (
    <MuiListItem {...(listItemProps as any)}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} secondary={secondary} />
      {secondaryAction && (
        <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
      )}
    </MuiListItem>
  );
};

export default ListItem;
