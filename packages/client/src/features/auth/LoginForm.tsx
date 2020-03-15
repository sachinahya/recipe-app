import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import TextField from '../forms/TextField';
import { UseAuthHook } from './useAuth';

export type LoginFormProps = Pick<UseAuthHook, 'login'>;

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={({ email, password }) => login(email, password)}
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
        <Button type="submit" size="small">
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
