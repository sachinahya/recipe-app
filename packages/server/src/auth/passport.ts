import logger from '@sachinahya/logger';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import express from 'express';
import passport from 'passport';
import { AuthenticateOptionsGoogle } from 'passport-google-oauth20';
import { Container } from 'typedi';

import User from '../entities/User';
import { Context } from '../resolvers/types';
import UserService from '../services/UserService';
import authRoutes from './auth.routes';
import { AuthenticateOptions, AuthenticationResult } from './LocalStrategy';
import strategies, { AuthStrategies } from './strategies';

export const configurePassport = (app: express.Application): void => {
  const userService = Container.get(UserService);

  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User, number>((id, done) => {
    void userService
      .getById(id)
      .then(matchingUser => done(null, matchingUser))
      .catch(err => done(err));
  });

  for (const [name, strategy] of Object.entries(strategies)) {
    passport.use(name, strategy);
  }

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/auth', authRoutes);
};

export const buildContext = ({ req, res }: ExpressContext): Context => {
  return {
    authenticate: (
      strategy: AuthStrategies,
      options: AuthenticateOptions | AuthenticateOptionsGoogle
    ): Promise<AuthenticationResult> => {
      return new Promise((resolve, reject) => {
        passport.authenticate(
          strategy,
          options as passport.AuthenticateOptions,
          (err, user, info) => {
            if (err) reject(err);
            resolve({ user, info });
          }
        )(req, res);
      });
    },
    user: req.user as User,
    login: (user: User) => req.login(user, err => err && logger.error(err)),
    logout: () => req.logout(),
  };
};
