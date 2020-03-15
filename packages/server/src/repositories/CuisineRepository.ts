import { Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import Cuisine from '../entities/Cuisine';
import CustomRepositoryBase from './CustomRepositoryBase';

@Service()
@EntityRepository(Cuisine)
export default class CuisineRepository extends CustomRepositoryBase<Cuisine> {}
