import { List, ListItemIcon, ListItemText } from '@material-ui/core';
import { useLayout } from 'components/Layout';
import { ListItemLink } from 'components/Lists';
import { FC } from 'react';
import { desktopUp, spacing } from 'src/styles/styleSelectors';

import { NavigationProps } from './Navigation.types';
import useNavigation from './useNavigation';

interface DrawerNavigationProps extends NavigationProps {
  'aria-label'?: string;
}

const DrawerNavigation: FC<DrawerNavigationProps> = ({ links, ...props }) => {
  const { closeDrawer } = useLayout();
  const { currentRoot } = useNavigation();

  return (
    <List
      css={theme => ({
        margin: spacing(2, 0)(theme),
        flexGrow: 1,

        '& .MuiList-root': {
          display: 'none',

          [desktopUp(theme)]: {
            display: 'block',
          },
        },
      })}
      {...props}
    >
      {links &&
        links.map(({ to, text, icon: Icon }) => {
          const isCurrent = to === currentRoot;
          return (
            <li key={text}>
              <ListItemLink to={to} selected={isCurrent} onClick={closeDrawer}>
                {Icon && (
                  <ListItemIcon>
                    <Icon color={isCurrent ? 'primary' : undefined} />
                  </ListItemIcon>
                )}
                <ListItemText>{text}</ListItemText>
              </ListItemLink>
            </li>
          );
        })}
    </List>
  );
};

export default DrawerNavigation;
