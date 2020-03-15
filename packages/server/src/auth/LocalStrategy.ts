import express from 'express';
import { Strategy } from 'passport-strategy';
import User from '../entities/User';

export interface AuthenticateOptions {
  email: string;
  password: string;
}

export interface AuthenticationResult {
  user?: User;
  info?: AuthenticationInfo;
}

interface AuthenticationInfo {
  message: string;
}

type LocalStrategyVerifyCallback = (
  email: string,
  password: string,
  done: (err: any, user?: User | null, info?: AuthenticationInfo) => void
) => void;

export default class LocalStrategy extends Strategy {
  constructor(private verify: LocalStrategyVerifyCallback) {
    super();
  }

  authenticate(req: express.Request, options: AuthenticateOptions) {
    try {
      this.verify(options.email, options.password, (err, user, info) => {
        if (err) return this.error(err);
        if (!user) return this.fail(info, 401);
        return this.success(user, info);
      });
    } catch (err) {
      this.error(err);
    }
  }
}
