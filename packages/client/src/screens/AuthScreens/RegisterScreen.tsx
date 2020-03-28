import { Box, Typography } from '@material-ui/core';
import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import { Form, Formik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { FormPaper, LoginButton, LoginField } from './components';
import {
  CreatedUserDocument,
  CreatedUserQuery,
  useRegisterUserMutation,
} from './RegisterScreen.gql';

interface RegisterFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const REGISTER_USER_MUTATION = gql`
  mutation registerUser($newUser: NewUserInput!) {
    register(newUser: $newUser) {
      email
    }
  }
`;

const CREATED_USER_QUERY = gql`
  query createdUser {
    currentUser {
      email
    }
  }
`;

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

const RegisterScreen: React.FC = () => {
  const [register, { error, loading }] = useRegisterUserMutation();
  const { push } = useHistory();
  const handleSubmit = (values: RegisterFormValues) => {
    register({
      variables: { newUser: { email: values.email, plainTextPassword: values.password } },
      update(cache, { data }) {
        if (data) {
          cache.writeQuery<CreatedUserQuery>({
            query: CreatedUserDocument,
            data: { currentUser: data.register },
          });
        }
      },
    })
      .then(() => push('/'))
      .catch(console.error);
  };

  return (
    <>
      <Header title="Register" />
      <Screen title="Register">
        <Formik<RegisterFormValues>
          initialValues={{ email: '', password: '', repeatPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          <Form>
            <FormPaper>
              <Box mb={3}>
                <Typography variant="h4">Sign up</Typography>
                <Typography color="textSecondary" variant="subtitle1" gutterBottom>
                  Create an account to save your recipes
                </Typography>
              </Box>
              <LoginField fullWidth name="email" id="email" label="Email" type="email" />
              <LoginField
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
              />
              <LoginField
                fullWidth
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
            </FormPaper>
          </Form>
        </Formik>
      </Screen>
    </>
  );
};

export default RegisterScreen;
