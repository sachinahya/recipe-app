import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export interface ListItemLinkProps extends ListItemProps {
  to: RouterLinkProps['to'];
  linkProps?: RouterLinkProps;
}

const ListItemLink: React.FC<ListItemLinkProps> = React.forwardRef<
  HTMLLIElement,
  ListItemLinkProps
>(({ children, to, linkProps, ...listItemProps }, ref) => {
  return (
    <ListItem
      button
      to={to}
      ref={ref}
      component={RouterLink}
      {...(listItemProps as any)}
      {...(linkProps as any)}
    >
      {children}
    </ListItem>
  );
});

ListItemLink.displayName = 'ListItemLink';

export default ListItemLink;
