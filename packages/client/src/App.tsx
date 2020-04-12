import { CssBaseline, Divider } from '@material-ui/core';
import { ErrorBoundary } from 'components/Errors';
import { Drawer, LayoutProvider, Root } from 'components/Layout';
import ThemeSwitcher from 'features/ThemeSwitcher';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { routerLinks } from 'routes/App.routes';

const ApolloClient2 = React.lazy(() => import('ApolloClientProvider'));
const AppRoutes = React.lazy(() => import('routes/App.routes'));
const UserCard = React.lazy(() => import('features/auth/components/UserCard'));
const BottomNavigation = React.lazy(() => import('components/Navigation/BottomNavigation'));
const DrawerNavigation = React.lazy(() => import('components/Navigation/DrawerNavigation'));

export const App: React.FC = () => {
  return (
    <ThemeSwitcher>
      <Router>
        <CssBaseline />
        <LayoutProvider>
          <Root>
            <React.Suspense fallback={null}>
              <ApolloClient2>
                {/* Renders as a <div /> for focus management */}
                <ErrorBoundary>
                  <AppRoutes />
                </ErrorBoundary>

                <React.Suspense fallback={<div>Loading</div>}>
                  <Drawer>
                    <Divider />
                    <DrawerNavigation links={routerLinks} />
                    <UserCard />
                  </Drawer>
                </React.Suspense>

                <React.Suspense fallback={<div>Loading</div>}>
                  {<BottomNavigation links={routerLinks} />}
                </React.Suspense>
              </ApolloClient2>
            </React.Suspense>
          </Root>
        </LayoutProvider>
      </Router>
    </ThemeSwitcher>
  );
};

export default App;
