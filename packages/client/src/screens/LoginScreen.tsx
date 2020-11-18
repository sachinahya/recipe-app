import { Box, Typography } from '@material-ui/core';
import FormPaper from 'components/FormPaper';
import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import GoogleSignInButton from 'features/auth/components/GoogleSignInButton';
import { FC } from 'react';

const LoginScreen: FC = () => {
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
          <GoogleSignInButton
            href={`${process.env.RA_CLIENT_GOOGLE_OAUTH_URI}?returnUrl=${window.location.href}`}
          />
        </FormPaper>
      </Screen>
    </>
  );
};

export default LoginScreen;
