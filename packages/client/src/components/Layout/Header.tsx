import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTabsContext } from 'components/Tabs/TabsContext';
import { FC, ReactElement, ReactNode } from 'react';
import { spacing } from 'styles/styleSelectors';

import Clear from './Clear';
import HeaderButton from './HeaderButton';

const titleStyles = { flexGrow: 1 };

export interface HeaderProps {
  title: string;
  variant?: 'back';
  actions?: ReactElement | null | undefined;
  tabs?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children, title, variant, actions, tabs, ...rest }) => {
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
          {actions && (
            <div
              css={theme => ({
                marginRight: spacing(-1.5)(theme),
              })}
            >
              {actions}
            </div>
          )}
        </Toolbar>
        {tabs}
      </AppBar>
      <Clear header tabs={!!tabs && enabled} />
    </>
  );
};

export default Header;
