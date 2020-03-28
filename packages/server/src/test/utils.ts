import path from 'path';
import { createConnection } from 'typeorm';
import { AuthenticateOptions, AuthenticationResult } from 'auth/LocalStrategy';
import User from 'entities/User';
import { ResolverContext } from 'resolvers/types';

export const connection = createConnection({
  type: 'sqlite',
  database: ':memory:',
  entities: [path.join(__dirname, '../entities/**/*.ts')],
  dropSchema: true,
  synchronize: true,
  logging: false,
});

type PartialUser = Partial<User> & Pick<User, 'id' | 'email' | 'password'>;

export const createResolverContext = (user: PartialUser): ResolverContext => {
  return {
    authenticate: jest.fn().mockImplementation(
      (req: null, options: AuthenticateOptions): AuthenticationResult => {
        if (options.email === user?.email && options.password === user.password) {
          return { user } as AuthenticationResult;
        }
        return { info: { message: 'Username/password incorrect.' } };
      }
    ),
    login: jest.fn(),
    logout: jest.fn(),
    user: user as User,
  };
};
