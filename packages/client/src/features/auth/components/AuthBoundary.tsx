import React from 'react';

import { useCurrentUser } from '../hooks';

interface AuthBoundaryProps {
  children: JSX.Element;
  fallback: JSX.Element;
}

const AuthBoundary: React.FC<AuthBoundaryProps> = ({ children, fallback }) => {
  const [user] = useCurrentUser();

  return user ? children : fallback;
};

export default AuthBoundary;
