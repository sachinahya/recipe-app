import { ApolloError } from 'apollo-client';
import { ErrorMessage } from 'components/Errors';
import { isAuthError } from 'features/auth';
import React from 'react';
import LoginScreen from './LoginScreen';

interface ErrorOrLoginScreenProps {
  error?: ApolloError;
}

const ErrorOrLoginScreen: React.FC<ErrorOrLoginScreenProps> = ({ error }) => {
  return error && !isAuthError(error) ? <ErrorMessage error={error} /> : <LoginScreen />;
};

export default ErrorOrLoginScreen;
