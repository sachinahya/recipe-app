import express from 'express';
import { AuthenticateOptionsGoogle } from 'passport-google-oauth20';

import { AuthenticateOptions, AuthenticationResult } from '../auth/LocalStrategy';
import { AuthStrategies } from '../auth/strategies';
import User from '../entities/User';

export interface Context {
  user?: User;
  login: (user: User) => void;
  logout: express.Request['logout'];

  authenticate(
    strategy: AuthStrategies.Local,
    options: AuthenticateOptions
  ): Promise<AuthenticationResult>;

  authenticate(
    strategy: AuthStrategies.Google,
    options: AuthenticateOptionsGoogle
  ): Promise<AuthenticationResult>;
}
export type ResolverContext = {
  [K in keyof Context]-?: NonNullable<Context[K]>;
};
