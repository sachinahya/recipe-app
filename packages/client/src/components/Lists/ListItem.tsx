import { ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import MuiListItem, { ListItemProps as MuiListItemProps } from '@material-ui/core/ListItem';
import { FC, ReactElement, ReactNode } from 'react';

interface ListItemProps extends MuiListItemProps {
  icon?: ReactElement;
  primary?: ReactNode;
  secondary?: ReactNode;
  secondaryAction?: ReactNode;
}

const ListItem: FC<ListItemProps> = ({
  children,
  icon,
  primary = children,
  secondary,
  secondaryAction,
  ...listItemProps
}) => {
  return (
    <MuiListItem {...(listItemProps as unknown)}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} secondary={secondary} />
      {secondaryAction && <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>}
    </MuiListItem>
  );
};

export default ListItem;
