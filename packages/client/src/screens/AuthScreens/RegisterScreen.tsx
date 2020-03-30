import { Box, Paper, Typography } from '@material-ui/core';
import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import RegistrationForm from 'features/auth/components/RegistrationForm';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

export const FormPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(4)};
  max-width: 450px;
  margin: ${getSpacing(6)} auto 0;
`;

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
