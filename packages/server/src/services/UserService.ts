import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PASSWORD_SALT_ROUNDS } from '../auth/constants';
import User from '../entities/User';
import NewUserInput from '../resolvers/inputTypes/NewUserInput';

export class DuplicateUserError extends Error {}

@Service()
export default class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return user.password == null ? false : bcrypt.compare(password, user.password.toString());
  }

  async registerGoogleUser(googleId: string, email: string) {
    const user = (await this.getByEmail(email)) || this.userRepository.create({ email });
    user.googleId = googleId;

    return this.userRepository.save(user);
  }

  async create(userInput: NewUserInput): Promise<User> {
    /* if (userInput.plainTextPassword.length > MAX_PASSWORD_LENGTH) {
      throw new Error('Password is too long.');
    } */

    const existing = await this.userRepository.findOne({
      where: { email: userInput.email },
    });

    if (existing) throw new DuplicateUserError('A user with this email already exists.');

    // This validation will never run because TypeGraphQL is already doing the validation for us.
    /* const errors = await validate(userInput);
    if (errors.length) {
      throw new UserInputError('Validation failed', errors);
    } */

    const hashedPassword = await bcrypt.hash(userInput.plainTextPassword, PASSWORD_SALT_ROUNDS);
    const newUser = this.userRepository.create({
      email: userInput.email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }
}
