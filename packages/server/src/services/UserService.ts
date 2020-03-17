import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PASSWORD_SALT_ROUNDS } from '../auth/constants';
import User from '../entities/User';
import NewUserInput from '../resolvers/inputTypes/NewUserInput';

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
    return bcrypt.compare(password, user.password.toString());
  }

  async create(userInput: NewUserInput): Promise<User> {
    /* if (userInput.plainTextPassword.length > MAX_PASSWORD_LENGTH) {
      throw new Error('Password is too long.');
    } */

    const existing = await this.userRepository.findOne({
      where: { email: userInput.email },
    });

    if (existing) throw new Error('A user with this email already exists.');

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

  async createTestUser(): Promise<User> {
    let user1 = await this.userRepository.findOne({
      where: {
        username: 'user1',
      },
    });

    if (!user1) {
      const newUser = this.userRepository.create({
        email: 'user1@email.com',
        password: 'password',
      });

      user1 = await this.userRepository.save(newUser);
    }

    return user1;
  }
}
