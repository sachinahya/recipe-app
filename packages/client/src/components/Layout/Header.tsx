import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import styled from 'styled-components';
import { getSpacing, getDrawerWidth } from 'styles/styleSelectors';
import Clear from './Clear';
import { useLayout } from './LayoutContext';
import { useTabsContext } from 'components/Tabs/TabsContext';
import { drawerShown } from 'styles/mediaQueries';

const HeaderButton = styled(IconButton).attrs({
  color: 'inherit',
  edge: 'start',
})`
  margin-right: ${getSpacing(1)};
`;

const titleStyles = { flexGrow: 1 };

export interface HeaderProps {
  title: string;
  variant?: 'back';
  actions?: React.ReactElement | null | undefined;
  tabs?: React.ReactNode;
  // position?: 'absolute' | 'fixed' | 'relative';
}

const Header: React.FC<HeaderProps> = ({
  children,
  title,
  variant,
  actions,
  tabs,

  ...rest
}) => {
  const { enabled } = useTabsContext();
  const { drawerPermanent, openDrawer } = useLayout();

  return (
    <>
      <AppBar {...rest} position="fixed">
        <Toolbar>
          {!drawerPermanent &&
            (variant === 'back' ? (
              <HeaderButton
                aria-label="Back"
                onClick={() => window.history.back()}
              >
                <ArrowBackIcon />
              </HeaderButton>
            ) : (
              <HeaderButton aria-label="Open drawer" onClick={openDrawer}>
                <MenuIcon />
              </HeaderButton>
            ))}
          {/* We need to ensure that we don't render more than one h1 at a time */}
          <Typography
            variant="h6"
            component="h1"
            color="inherit"
            noWrap
            style={titleStyles}
          >
            {title}
          </Typography>
          {actions && <HeaderActions>{actions}</HeaderActions>}
        </Toolbar>
        {tabs}
      </AppBar>
      <Clear header tabs={!!tabs && enabled} />
    </>
  );
};

const HeaderActions = styled.div`
  margin-right: ${getSpacing(-1.5)};
`;

export default styled(Header)`
  ${drawerShown} {
    width: calc(100% - ${getDrawerWidth});
  }
`;
// export default withLayout(styled(Header)``);
