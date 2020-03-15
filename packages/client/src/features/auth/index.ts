import { ApolloError } from 'apollo-client';

export { default as LoginForm } from './LoginForm';
export { default as useAuth } from './useAuth';
export { default as UserCard } from './UserCard';

export const isAuthError = (error: ApolloError): boolean => {
  return !!error.graphQLErrors.find(err => err.extensions?.code === 'UNAUTHENTICATED');
};
