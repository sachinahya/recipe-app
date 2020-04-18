import { Box, Typography } from '@material-ui/core';
import FormPaper from 'components/FormPaper';
import { Header } from 'components/Layout';
import Link from 'components/Link';
import Screen from 'components/Screen';
import LoginForm from 'features/auth/components/LoginForm';
import React from 'react';

const LoginScreen: React.FC = () => {
  return (
    <>
      <Header title="" />
      <Screen title="Login">
        <FormPaper>
          <Box mb={3}>
            <Typography variant="h4">Welcome back</Typography>
            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
              Sign in to see your recipes
            </Typography>
          </Box>

          <LoginForm />

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              <Link
                to=""
                onClick={(evt: any) => {
                  evt.preventDefault();
                  console.log('Hello');
                }}
              >
                Forgot password?
              </Link>
              <br />
              New user? <Link to="/register">Sign up now</Link>
            </Typography>
          </Box>
        </FormPaper>
      </Screen>
    </>
  );
};

export default LoginScreen;
