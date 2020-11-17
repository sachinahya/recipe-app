import User from 'src/entities/User';
import { connection } from 'src/test/utils';

import UserService, { DuplicateUserError } from './UserService';

let userService: UserService;

beforeAll(async () => {
  userService = new UserService((await connection).getRepository(User));
});

afterAll(async () => {
  void (await connection).dropDatabase();
});

const email = 'me@email.com';
const plainTextPassword = 'password';
let user: User;

it('creates one user per email address', async () => {
  const newUser = await userService.create({
    email,
    plainTextPassword,
  });

  user = newUser;

  expect(user.id).toBeDefined();
  void expect(userService.create({ email, plainTextPassword })).rejects.toThrowError(
    DuplicateUserError
  );
});

it('finds the created user by id and email', async () => {
  const foundById = await userService.getById(user.id);
  const foundByEmail = await userService.getByEmail(email);

  expect(foundById?.email).toEqual(email);
  expect(foundByEmail?.email).toEqual(email);
});

it('validates the user password', async () => {
  expect(await userService.validatePassword(user, 'password')).toEqual(true);
  expect(await userService.validatePassword(user, 'pass2')).toEqual(false);
});
