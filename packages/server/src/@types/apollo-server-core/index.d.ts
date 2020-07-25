import 'apollo-server-core';

import express from 'express';
import { AuthenticateOptionsGoogle } from 'passport-google-oauth20';

import { AuthenticateOptions, AuthenticationResult } from '../../auth/LocalStrategy';
import { AuthStrategies } from '../../auth/strategies';
import User from '../../entities/User';

declare module 'apollo-server-core' {
  type Context = {
    user?: User;
    login: any;
    logout: express.Request['logout'];

    authenticate(
      strategy: AuthStrategies.Local,
      options: AuthenticateOptions
    ): Promise<AuthenticationResult>;

    authenticate(
      strategy: AuthStrategies.Google,
      options: AuthenticateOptionsGoogle
    ): Promise<AuthenticationResult>;
  };
}
