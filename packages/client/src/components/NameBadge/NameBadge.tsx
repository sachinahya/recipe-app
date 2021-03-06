import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { FC } from 'react';

import UserAvatar from '../UserAvatar';

interface NameBadgeProps {
  name?: string;
  showAvatar?: boolean;
}

const NameBadge: FC<NameBadgeProps> = ({ name, showAvatar, ...props }) => (
  <ListItem component="div" disableGutters {...props}>
    {showAvatar && (
      <ListItemAvatar>
        <UserAvatar name={name} />
      </ListItemAvatar>
    )}
    <ListItemText>{name}</ListItemText>
  </ListItem>
);

export default NameBadge;
