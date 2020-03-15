import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Category from '../entities/Category';
import Cuisine from '../entities/Cuisine';
import User from '../entities/User';
import { ResolverContext } from './types';
import { sleep } from '../helpers';

@Resolver()
export default class UserDataResolver {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  @Authorized()
  @Query(returns => [Category])
  async userCategories(@Ctx() context: ResolverContext): Promise<Category[]> {
    const user = await this.userRepository.findOneOrFail(context.user.id, {
      relations: ['categories'],
    });
    await sleep(1500);
    return user.categories;
  }

  @Authorized()
  @Query(returns => [Cuisine])
  async userCuisines(@Ctx() context: ResolverContext): Promise<Cuisine[]> {
    const user = await this.userRepository.findOneOrFail(context.user.id, {
      relations: ['cuisines'],
    });
    return user.cuisines;
  }
}
