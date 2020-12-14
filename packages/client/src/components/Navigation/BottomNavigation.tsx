import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useLayout } from 'components/Layout';
import { FC } from 'react';
import { desktopUp } from 'src/styles/styleSelectors';

import { NavigationProps } from './Navigation.types';
import useNavigation from './useNavigation';

const BottomNavigation: FC<NavigationProps> = ({ links, ...rest }) => {
  const { currentRoot, navigate } = useNavigation();
  const { bottomNavVisible } = useLayout();

  return (
    <nav
      css={theme => ({
        gridArea: 'footer',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,

        [desktopUp(theme)]: {
          display: 'none',
        },
      })}
      style={{ display: bottomNavVisible ? undefined : 'none' }}
      {...rest}
    >
      <MuiBottomNavigation
        showLabels={true}
        value={currentRoot}
        onChange={(evt, value) => navigate(value)}
      >
        {links &&
          links.map(({ to, text, icon: Icon }) => (
            <BottomNavigationAction key={text} value={to} label={text} icon={Icon && <Icon />} />
          ))}
      </MuiBottomNavigation>
    </nav>
  );
};

export default BottomNavigation;
