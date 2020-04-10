import { Button, Typography } from '@material-ui/core';
import TextField from 'features/forms/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';
import { object, ref, string } from 'yup';
import { useRegistration } from '../hooks';

export interface RegisterFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const registerSchema = object<RegisterFormValues>({
  email: string()
    .email('Must enter a valid email address.')
    .required('Email is required.'),
  password: string()
    .min(8, ({ min }) => `Password must be a minimum of ${min} characters long.`)
    .required('Password is required.'),
  repeatPassword: string()
    .oneOf([ref('password')], 'Password and repeat password must match.')
    .required('Repeat password is required.'),
});

const RegistrationForm: React.FC = props => {
  const [register, { error, loading }] = useRegistration();

  return (
    <Formik<RegisterFormValues>
      initialValues={{ email: '', password: '', repeatPassword: '' }}
      onSubmit={register}
      validationSchema={registerSchema}
      {...props}
    >
      <Form>
        <LoginField name="email" id="email" label="Email" type="email" />
        <LoginField name="password" id="password" label="Password" type="password" />
        <LoginField
          name="repeatPassword"
          id="repeatPassword"
          label="Confirm password"
          type="password"
        />

        {error && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {error.message}
          </Typography>
        )}

        <LoginButton disabled={loading} size="large" variant="contained" type="submit">
          Register
        </LoginButton>
      </Form>
    </Formik>
  );
};

export const LoginField = styled(TextField).attrs({
  fullWidth: true,
})`
  margin-bottom: ${getSpacing(2)};
`;

export const LoginButton = styled(Button)`
  margin: ${getSpacing(2)} 0;
  align-self: center;
`;

export default RegistrationForm;
