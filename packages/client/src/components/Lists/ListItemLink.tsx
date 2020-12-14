import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import { forwardRef, Ref, FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export interface ListItemLinkProps extends ListItemProps {
  to: RouterLinkProps['to'];
  linkProps?: RouterLinkProps;
}

const ListItemLink: FC<ListItemLinkProps> = forwardRef<HTMLLIElement, ListItemLinkProps>(
  ({ children, linkProps, ...listItemProps }, ref) => {
    return (
      <ListItem
        button
        ref={ref as Ref<HTMLDivElement>}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={RouterLink as any}
        {...(listItemProps as unknown)}
        {...(linkProps as unknown)}
      >
        {children}
      </ListItem>
    );
  }
);

ListItemLink.displayName = 'ListItemLink';

export default ListItemLink;
