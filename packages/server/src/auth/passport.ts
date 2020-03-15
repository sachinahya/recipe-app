import { Context } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import express from 'express';
import passport from 'passport';
import Container from 'typedi';
import User from '../entities/User';
import logger from '@sachinahya/logger';
import UserService from '../services/UserService';
import { AuthStrategies } from './AuthStrategies';
import LocalStrategy, { AuthenticateOptions, AuthenticationResult } from './LocalStrategy';

export const configurePassport = (app: express.Application, userService: UserService) => {
  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User, number>((id, done) => {
    Container.get(UserService)
      .getById(id)
      .then(matchingUser => done(null, matchingUser));
  });

  passport.use(
    AuthStrategies.local,
    new LocalStrategy((email, password, done) => {
      (async () => {
        try {
          const foundUser = await userService.getByEmail(email);

          if (!foundUser) {
            return done(null, undefined, { message: 'Email not found.' });
          }

          if (!(await userService.validatePassword(foundUser, password))) {
            return done(null, undefined, { message: 'Incorrect password.' });
          }

          return done(null, foundUser);
        } catch (err) {
          logger.error(err);
          return done(err);
        }
      })();
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

export const buildContext = ({ req, res }: ExpressContext): Context => {
  function authenticate(
    strategy: AuthStrategies.local,
    options: AuthenticateOptions
  ): Promise<AuthenticationResult> {
    return new Promise((resolve, reject) => {
      passport.authenticate(strategy, options as any, (err, user, info) => {
        if (err) reject(err);
        resolve({ user, info });
      })(req, res);
    });
  }

  return {
    authenticate,
    user: req.user as User,
    login: (user: User) => req.login(user, err => err && logger.error(err)),
    logout: () => req.logout(),
  };
};
