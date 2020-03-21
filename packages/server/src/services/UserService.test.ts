import User from 'entities/User';
import db from 'test/db';
import UserService, { DuplicateUserError } from './UserService';

let userService: UserService;

beforeAll(async () => {
  userService = new UserService((await db).getRepository(User));
});

afterAll(async () => {
  (await db).dropDatabase();
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
  expect(userService.create({ email, plainTextPassword })).rejects.toThrowError(DuplicateUserError);
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
