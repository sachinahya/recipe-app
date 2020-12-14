import { Box, Paper, Typography } from '@material-ui/core';
import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import GoogleSignInButton from 'features/auth/components/GoogleSignInButton';
import { FC } from 'react';
import { spacing } from 'src/styles/styleSelectors';

const LoginScreen: FC = () => {
  return (
    <>
      <Header title="" />
      <Screen title="Login">
        <Paper
          css={theme => ({
            display: 'flex',
            flexDirection: 'column',
            padding: spacing(4)(theme),
            maxWidth: 450,
            margin: spacing(6, 'auto')(theme),
          })}
        >
          <Box mb={3}>
            <Typography variant="h4">Welcome back</Typography>
            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
              Sign in to see your recipes
            </Typography>
          </Box>
          <GoogleSignInButton
            href={`${process.env.RA_CLIENT_GOOGLE_OAUTH_URI}?returnUrl=${window.location.href}`}
          />
        </Paper>
      </Screen>
    </>
  );
};

export default LoginScreen;
