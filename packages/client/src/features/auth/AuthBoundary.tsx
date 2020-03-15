import React from 'react';
import useAuth from './useAuth';

interface AuthBoundaryProps {
  fallback: React.ReactElement;
}

const AuthBoundary: React.FC<AuthBoundaryProps> = ({ children, fallback }) => {
  return useAuth().user ? <>{children}</> : fallback;
};

export default AuthBoundary;
