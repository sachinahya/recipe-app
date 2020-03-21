import authChecker from './authChecker';
import User from 'entities/User';

const fakeArgs = {
  context: {
    user: new User(),
    authenticate: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  },
  root: {},
  args: {},
  info: {} as any,
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
