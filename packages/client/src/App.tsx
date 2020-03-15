import { Box, CssBaseline, Divider } from '@material-ui/core';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ErrorBoundary } from 'components/Errors';
import { Drawer, LayoutProvider, Root } from 'components/Layout';
import { BottomNavigation, DrawerNavigation } from 'components/Navigation';
import { useAuth, UserCard } from 'features/auth';
import { ThemeSwitcherProvider, useThemeSwitcher } from 'features/ThemeSwitcher';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes, { routerLinks } from 'routes/App.routes';
import { ThemeProvider } from 'styled-components';

const AppBootstrap: React.FC = () => {
  return (
    <ThemeSwitcherProvider>
      <App />
    </ThemeSwitcherProvider>
  );
};

export const App: React.FC = () => {
  const { user, logout } = useAuth();
  const theme = useThemeSwitcher();

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <LayoutProvider>
              <Root>
                {/* Renders as a <div /> for focus management */}
                <ErrorBoundary>
                  <AppRoutes />
                </ErrorBoundary>

                <Drawer>
                  <Divider />
                  <DrawerNavigation links={routerLinks} />
                  <Box p={2}>{user ? <UserCard user={user} logout={logout} /> : null}</Box>
                </Drawer>

                <BottomNavigation links={routerLinks} />
              </Root>
            </LayoutProvider>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default /* process.env.NODE_ENV === 'development' ? hot(AppBootstrap) :  */ AppBootstrap;
