import { Box, Typography } from '@material-ui/core';
import Link from 'components/Link';
import { useAuth } from 'features/auth';
import { Form, Formik } from 'formik';
import React from 'react';
import { object, string } from 'yup';
import { FormPaper, LoginButton, LoginField } from './components';

const schema = object({
  email: string()
    .email()
    .required(),
  password: string().required(),
});

const LoginScreen: React.FC = () => {
  const { login, error, loading } = useAuth();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={({ email, password }) => login(email, password)}
      validationSchema={schema}
    >
      <Form>
        <FormPaper>
          <Box mb={3}>
            <Typography variant="h4">Welcome back</Typography>
            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
              Sign in to see your recipes
            </Typography>
          </Box>
          <LoginField fullWidth name="email" id="email" label="Email" type="email" />
          <LoginField fullWidth name="password" id="password" label="Password" type="password" />

          {error && (
            <Typography variant="body2" color="error" align="center" gutterBottom>
              {error.message}
            </Typography>
          )}

          <LoginButton disabled={loading} size="large" variant="contained" type="submit">
            Login
          </LoginButton>

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
      </Form>
    </Formik>
  );
};

export default LoginScreen;
