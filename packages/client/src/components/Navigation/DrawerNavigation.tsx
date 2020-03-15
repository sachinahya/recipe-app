import { List, ListItemIcon, ListItemText } from '@material-ui/core';
import { useLayout } from 'components/Layout';
import { ListItemLink } from 'components/Lists';
import React from 'react';
import styled from 'styled-components';
import { desktopUp } from 'styles/mediaQueries';
import { NavigationProps } from './Navigation.types';
import useNavigation from './useNavigation';

interface DrawerNavigationProps extends NavigationProps {
  'aria-label'?: string;
}

const DrawerNavigation: React.FC<DrawerNavigationProps> = ({ links }) => {
  const { closeDrawer } = useLayout();
  const { currentRoot } = useNavigation();

  return (
    <List>
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

export default styled(DrawerNavigation)`
  margin: ${props => props.theme.spacing(2, 0)};
  flex-grow: 1;

  & .MuiList-root {
    display: none;

    ${desktopUp} {
      display: block;
    }
  }
`;
