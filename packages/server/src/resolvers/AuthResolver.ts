import logger from '@sachinahya/logger';
import { AuthenticationError, Context } from 'apollo-server-core';
import { Arg, Ctx, Int, Mutation, Query } from 'type-graphql';
import { Service } from 'typedi';

import { AuthStrategies } from '../auth/strategies';
import User from '../entities/User';
import UserService from '../services/UserService';
import NewUserInput from './inputTypes/NewUserInput';

@Service()
export default class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User, { nullable: true })
  currentUser(@Ctx() context: Context): User | undefined {
    return context.user;
  }

  @Mutation(returns => User)
  async register(@Arg('newUser') newUser: NewUserInput, @Ctx() context: Context): Promise<User> {
    const user = await this.userService.create(newUser);
    context.login(user);
    logger.info(`User ID is ${user.id}.`);
    return user;
  }

  @Mutation(returns => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: Context
  ): Promise<User> {
    const { user, info } = await context.authenticate(AuthStrategies.Local, {
      email,
      password,
    });

    if (user) {
      context.login(user);
      logger.info(`User ID is ${user.id}.`);
      return user;
    }

    throw new AuthenticationError(info?.message || 'Unknown error');
  }

  @Mutation(returns => User)
  async loginGoogle(@Ctx() context: Context): Promise<User> {
    const { user, info } = await context.authenticate(AuthStrategies.Google, {
      scope: ['openid', 'profile', 'email'],
    });

    if (user) {
      context.login(user);
      logger.info(`User ID is ${user.id}.`);
      return user;
    }

    throw new AuthenticationError(info?.message || 'Unknown error');
  }

  @Mutation(returns => Int)
  logout(@Ctx() context: Context): number {
    context.logout();
    return 0;
  }
}
