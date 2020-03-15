import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { desktopUp } from 'styles/mediaQueries';
import { NavigationProps } from './Navigation.types';
import useNavigation from './useNavigation';
import { useLayout } from 'components/Layout';

const BottomNavigation: React.FC<NavigationProps> = ({ links, ...rest }) => {
  const { currentRoot, navigate } = useNavigation();
  const { bottomNavVisible } = useLayout();

  const props = useSpring({
    transform: bottomNavVisible ? 'translateY(0%)' : 'translateY(100%)',
  });

  return (
    <animated.nav style={props} {...rest}>
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
    </animated.nav>
  );
};

export default styled(BottomNavigation)`
  grid-area: footer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.appBar};

  ${desktopUp} {
    display: none;
  }
`;
