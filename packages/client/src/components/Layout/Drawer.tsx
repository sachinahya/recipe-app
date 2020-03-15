import { Drawer as MuiDrawer } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { getDrawerWidth } from 'styles/styleSelectors';
import { useLayout } from './LayoutContext';

const Drawer: React.FC = ({ children, ...rest }) => {
  const { drawerOpen, drawerPermanent, closeDrawer } = useLayout();

  return (
    <MuiDrawer
      {...rest}
      classes={{ paper: 'paper' }}
      variant={drawerPermanent ? 'permanent' : 'temporary'}
      open={drawerOpen}
      onClose={closeDrawer}
      ModalProps={{ keepMounted: true }}
    >
      {children}
    </MuiDrawer>
  );
};

export default styled(Drawer)`
  & .paper {
    /* position: static; */
    width: ${getDrawerWidth};
  }
`;
