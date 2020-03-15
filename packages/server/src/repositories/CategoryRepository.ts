import { Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import Category from '../entities/Category';
import CustomRepositoryBase from './CustomRepositoryBase';

@Service()
@EntityRepository(Category)
export default class CategoryRepository extends CustomRepositoryBase<Category> {}
