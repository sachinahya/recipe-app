import { Box, Typography } from '@material-ui/core';
import FormPaper from 'components/FormPaper';
import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import RegistrationForm from 'features/auth/components/RegistrationForm';
import React from 'react';

const RegisterScreen: React.FC = () => {
  return (
    <>
      <Header title="Register" />
      <Screen title="Register">
        <FormPaper>
          <Box mb={3}>
            <Typography variant="h4">Sign up</Typography>
            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
              Create an account to save your recipes
            </Typography>
          </Box>
          <RegistrationForm />
        </FormPaper>
      </Screen>
    </>
  );
};

export default RegisterScreen;
