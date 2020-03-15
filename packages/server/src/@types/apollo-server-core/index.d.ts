import 'apollo-server-core';
import express from 'express';
import { AuthStrategies } from '../../auth/AuthStrategies';
import { AuthenticateOptions, AuthenticationResult } from '../../auth/LocalStrategy';
import User from '../../entities/User';

declare module 'apollo-server-core' {
  type Context = {
    user?: User;
    login: any;
    logout: express.Request['logout'];

    authenticate(
      strategy: AuthStrategies.local,
      options: AuthenticateOptions
    ): Promise<AuthenticationResult>;
    authenticate(strategy: AuthStrategies, options: any): Promise<AuthenticationResult>;
  };
}
