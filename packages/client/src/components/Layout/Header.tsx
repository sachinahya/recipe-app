import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTabsContext } from 'components/Tabs/TabsContext';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

import Clear from './Clear';
import HeaderButton from './HeaderButton';

const titleStyles = { flexGrow: 1 };

export interface HeaderProps {
  title: string;
  variant?: 'back';
  actions?: React.ReactElement | null | undefined;
  tabs?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children, title, variant, actions, tabs, ...rest }) => {
  const { enabled } = useTabsContext();

  return (
    <>
      <AppBar {...rest} position="fixed">
        <Toolbar>
          <HeaderButton variant={variant} />
          {/* We need to ensure that we don't render more than one h1 at a time */}
          <Typography variant="h6" component="h1" color="inherit" noWrap style={titleStyles}>
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

export default Header;
