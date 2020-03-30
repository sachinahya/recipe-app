import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import TextField from '../../forms/TextField';
import { useLogin } from '../hooks';

const LoginForm: React.FC = props => {
  const [login, { loading }] = useLogin();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={({ email, password }) => login(email, password)}
      {...props}
    >
      <Form>
        <TextField fullWidth margin="dense" name="email" id="email" label="Email" type="email" />
        <br />
        <TextField
          fullWidth
          margin="dense"
          name="password"
          id="password"
          label="Password"
          type="password"
        />
        <br />
        <Button type="submit" size="small" disabled={loading}>
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
