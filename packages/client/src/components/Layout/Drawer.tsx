import { Drawer as MuiDrawer } from '@material-ui/core';
import { FC } from 'react';
import { getDrawerWidth } from 'styles/styleSelectors';
import { useLayout } from './LayoutContext';

const Drawer: FC = ({ children, ...rest }) => {
  const { drawerOpen, drawerPermanent, closeDrawer } = useLayout();

  return (
    <MuiDrawer
      {...rest}
      css={theme => ({
        paper: {
          width: getDrawerWidth(theme),
        },
      })}
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

export default Drawer;
