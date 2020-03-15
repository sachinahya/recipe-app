import { Context } from 'apollo-server-core';
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query } from 'type-graphql';
import { AuthStrategies } from '../auth/AuthStrategies';
import User from '../entities/User';
import logger from '@sachinahya/logger';
import UserService from '../services/UserService';
import NewUserInput from './inputTypes/NewUserInput';

@ObjectType()
class AuthError {
  @Field()
  message: string;
}

export default class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User, { nullable: true })
  currentUser(@Ctx() context: Context): User | undefined {
    return context.user;
  }

  @Mutation(returns => User)
  async register(@Arg('newUser') newUser: NewUserInput): Promise<User> {
    return this.userService.create(newUser);
  }

  @Mutation(returns => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: Context
  ): Promise<User> {
    const { user, info } = await context.authenticate(AuthStrategies.local, {
      email,
      password,
    });

    if (user) {
      context.login(user);
      logger.info(`User ID is ${user.id}.`);
      return user;
    }

    const error = new AuthError();
    error.message = info ? info.message : 'Unknown error';
    throw error;
  }

  @Mutation(returns => Int)
  logout(@Ctx() context: Context): number {
    context.logout();
    return 0;
  }
}
