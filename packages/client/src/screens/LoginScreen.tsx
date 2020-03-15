import { Box, Paper, Typography } from '@material-ui/core';
import Button from 'components/Button';
import Link from 'components/Link';
import { useAuth } from 'features/auth';
import TextField from 'features/forms/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';
import { object, string } from 'yup';

const FormPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(4)};
  max-width: 450px;
  margin: ${getSpacing(6)} auto 0;
`;

const LoginField = styled(TextField).attrs({
  fullWidth: true,
})`
  margin-bottom: ${getSpacing(2)};
`;

const LoginButton = styled(Button)`
  margin: ${getSpacing(2)} 0;
  align-self: center;
`;

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
              New user? <Link to="">Sign up now</Link>
            </Typography>
          </Box>
        </FormPaper>
      </Form>
    </Formik>
  );
};

export default LoginScreen;
