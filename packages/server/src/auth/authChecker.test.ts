import { GraphQLResolveInfo } from 'graphql';
import User from 'src/entities/User';

import authChecker from './authChecker';

const fakeArgs = {
  context: {
    user: new User(),
    authenticate: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  },
  root: {},
  args: {},
  info: {} as GraphQLResolveInfo,
};

it('returns true when a user is supplied', () => {
  const result = authChecker(fakeArgs, []);
  expect(result).toEqual(true);
});

it('returns false when there is no user in the context', () => {
  const result = authChecker(
    { ...fakeArgs, context: { ...fakeArgs.context, user: undefined } },
    []
  );
  expect(result).toEqual(false);
});
