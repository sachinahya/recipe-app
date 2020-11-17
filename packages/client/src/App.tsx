import { CssBaseline } from '@material-ui/core';
import { ErrorBoundary } from 'components/Errors';
import { LayoutProvider, Root } from 'components/Layout';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import ThemeSwitcher from 'features/ThemeSwitcher';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';
import UrqlClient from 'src/graphql/UrqlClient';

const AppRoutes = React.lazy(() => import('routes/App.routes'));

const App: React.FC = () => {
  return (
    <ThemeSwitcher>
      <Router>
        <CssBaseline />
        <LayoutProvider>
          <Root>
            <React.Suspense fallback={null}>
              <UrqlClient>
                {/* Renders as a <div /> for focus management */}
                <ErrorBoundary>
                  <AuthBoundary
                    fallback={({ fetching }) => (fetching ? null : <LoginScreen />)}
                    skipCache
                  >
                    <AppRoutes />
                  </AuthBoundary>
                </ErrorBoundary>
              </UrqlClient>
            </React.Suspense>
          </Root>
        </LayoutProvider>
      </Router>
    </ThemeSwitcher>
  );
};

export default App;
