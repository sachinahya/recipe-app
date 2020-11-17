import { AuthenticationError } from 'apollo-server-core';

import User from '../../entities/User';
import UserResolver from '../../resolvers/AuthResolver';
import { ResolverContext } from '../../resolvers/types';
import UserService from '../../services/UserService';
import { user1Input } from '../fixtures/users';
import { connection, createResolverContext } from '../utils';

let userService: UserService;
let authResolver: UserResolver;

const email = user1Input.email;
const plainTextPassword = user1Input.plainTextPassword;

const context: ResolverContext = createResolverContext({
  id: 1,
  email: email,
  password: plainTextPassword,
});

beforeAll(async () => {
  userService = new UserService((await connection).getRepository(User));
  authResolver = new UserResolver(userService);
});

afterAll(async () => {
  void (await connection).dropDatabase();
});

it('should create a new user and log them in', async () => {
  const user = await authResolver.register({ email, plainTextPassword }, context);

  expect(user.email).toEqual(email);
  expect(context.login).toBeCalledTimes(1);
  expect(context.login).toBeCalledWith(user);
});

it('should log the user out', () => {
  authResolver.logout(context);

  expect(context.logout).toBeCalledTimes(1);
});

it('should authenticate the user and log them in, or reject with an error if invalid', async () => {
  const user = await authResolver.login(email, plainTextPassword, context);

  expect(user.id).toBeDefined();
  expect(context.login).toBeCalledWith(user);
  expect(context.login).toBeCalledTimes(1);

  const invalidLogin = authResolver.login('blah', 'blah', context);

  void expect(invalidLogin).rejects.toThrowError(AuthenticationError);
});
