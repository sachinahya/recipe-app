import logger from '@sachinahya/logger';
import { Context } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import express from 'express';
import passport from 'passport';
import Container from 'typedi';

import User from '../entities/User';
import UserService from '../services/UserService';
import { AuthenticationResult } from './LocalStrategy';
import strategies, { AuthStrategies } from './strategies';

export const configurePassport = (app: express.Application) => {
  const userService = Container.get(UserService);

  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User, number>((id, done) => {
    userService.getById(id).then(matchingUser => done(null, matchingUser));
  });

  for (const [name, strategy] of Object.entries(strategies)) {
    passport.use(name, strategy);
  }

  app.use(passport.initialize());
  app.use(passport.session());
};

export const buildContext = ({ req, res }: ExpressContext): Context => {
  return {
    authenticate: (strategy: AuthStrategies, options: any): Promise<AuthenticationResult> => {
      return new Promise((resolve, reject) => {
        passport.authenticate(strategy, options, (err, user, info) => {
          if (err) reject(err);
          resolve({ user, info });
        })(req, res);
      });
    },
    user: req.user as User,
    login: (user: User) => req.login(user, err => err && logger.error(err)),
    logout: () => req.logout(),
  };
};
