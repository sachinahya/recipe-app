import { Button, Typography } from '@material-ui/core';
import { useLogin } from 'features/auth/hooks';
import TextField from 'features/forms/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';
import { object, string } from 'yup';

const schema = object({
  email: string()
    .email()
    .required(),
  password: string().required(),
});

const LoginField = styled(TextField).attrs({
  fullWidth: true,
})`
  margin-bottom: ${getSpacing(2)};
`;

const LoginButton = styled(Button)`
  margin: ${getSpacing(2)} 0;
  align-self: center;
`;

const LoginForm: React.FC = () => {
  const [login, { error, loading }] = useLogin();

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
      </Form>
    </Formik>
  );
};

export default LoginForm;
