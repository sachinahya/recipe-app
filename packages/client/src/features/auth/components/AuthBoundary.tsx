import { ApolloError } from 'apollo-client';
import React from 'react';
import UnauthenticatedError from '../UnauthenticatedError';

export const isAuthError = (error: ApolloError): boolean => {
  return (
    error instanceof UnauthenticatedError ||
    error.graphQLErrors.some(err => err.extensions?.code === 'UNAUTHENTICATED')
  );
};

interface AuthBoundaryProps {
  fallback: JSX.Element;
}

interface AuthBoundaryState {
  error?: ApolloError;
}

class AuthBoundary extends React.Component<AuthBoundaryProps, AuthBoundaryState> {
  state: AuthBoundaryState = {
    error: undefined,
  };

  componentDidCatch(error: ApolloError) {
    if (!isAuthError(error)) throw error;
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default AuthBoundary;
