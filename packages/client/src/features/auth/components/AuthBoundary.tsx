import React from 'react';

import { useCurrentUser, UseCurrentUserHookStatus, UseCurrentUserOptions } from '../hooks';

interface AuthBoundaryProps extends UseCurrentUserOptions {
  children: JSX.Element;
  fallback: JSX.Element | null | ((status: UseCurrentUserHookStatus) => JSX.Element | null);
}

const AuthBoundary: React.FC<AuthBoundaryProps> = ({ children, fallback, ...hookOptions }) => {
  const [user, status] = useCurrentUser(hookOptions);

  if (user) return children;
  return typeof fallback === 'function' ? fallback(status) : fallback;
};

export default AuthBoundary;
