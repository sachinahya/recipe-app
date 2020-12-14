import { FC } from 'react';

import { MutationStatus, useCurrentUser, UseCurrentUserOptions } from '../hooks';

interface AuthBoundaryProps extends UseCurrentUserOptions {
  children: JSX.Element;
  fallback: JSX.Element | null | ((status: MutationStatus) => JSX.Element | null);
}

const AuthBoundary: FC<AuthBoundaryProps> = ({ children, fallback, ...hookOptions }) => {
  const [user, status] = useCurrentUser(hookOptions);

  if (user) return children;
  return typeof fallback === 'function' ? fallback(status) : fallback;
};

export default AuthBoundary;
