import { CssBaseline } from '@material-ui/core';
import { ErrorBoundary } from 'components/Errors';
import { LayoutProvider, Root } from 'components/Layout';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import ThemeSwitcher from 'features/ThemeSwitcher';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';

const ApolloClientProvider = React.lazy(() => import('ApolloClientProvider'));
const AppRoutes = React.lazy(() => import('routes/App.routes'));
/* const UserCard = React.lazy(() => import('features/auth/components/UserCard'));
const BottomNavigation = React.lazy(() => import('components/Navigation/BottomNavigation'));
const DrawerNavigation = React.lazy(() => import('components/Navigation/DrawerNavigation')); */

export const App: React.FC = () => {
  return (
    <ThemeSwitcher>
      <Router>
        <CssBaseline />
        <LayoutProvider>
          <Root>
            <React.Suspense fallback={null}>
              <ApolloClientProvider>
                {/* Renders as a <div /> for focus management */}
                <ErrorBoundary>
                  <AuthBoundary
                    fallback={({ loading }) => (loading ? null : <LoginScreen />)}
                    skipCache
                  >
                    <AppRoutes />
                  </AuthBoundary>
                </ErrorBoundary>

                {/* <React.Suspense fallback={null}>
                  <Drawer>
                    <Divider />
                    <DrawerNavigation links={routerLinks} />
                    <UserCard />
                  </Drawer>
                </React.Suspense> */}

                {/* <AuthBoundary fallback={null}>
                  <React.Suspense fallback={null}>
                    {<BottomNavigation links={routerLinks} />}
                  </React.Suspense>
                </AuthBoundary> */}
              </ApolloClientProvider>
            </React.Suspense>
          </Root>
        </LayoutProvider>
      </Router>
    </ThemeSwitcher>
  );
};

export default App;
