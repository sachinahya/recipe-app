import logger from '@sachinahya/logger';
import { Strategy } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Container } from 'typedi';

import config from '../config';
import UserService from '../services/UserService';
import LocalStrategy from './LocalStrategy';

export enum AuthStrategies {
  Local = 'custom-local',
  Google = 'google',
}

const strategies: { [K in AuthStrategies]: Strategy } = {
  [AuthStrategies.Local]: new LocalStrategy((email, password, done) => {
    const userService = Container.get(UserService);
    void (async () => {
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
  }),

  [AuthStrategies.Google]: new GoogleStrategy(
    {
      clientID: config.auth.googleClientId,
      clientSecret: config.auth.googleClientSecret,
      callbackURL: config.auth.redirectUrl,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;
      if (!email) return done(undefined, undefined, { message: 'Email not found in profile.' });

      const userService = Container.get(UserService);
      userService
        .registerGoogleUser(profile.id, email)
        .then(user => done(undefined, user))
        .catch(err => done(err));
    }
  ),
};

export default strategies;
