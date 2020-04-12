import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { HASHED_PASSWORD_LENGTH } from '../auth/constants';
import config from '../config';
import Category from './Category';
import Cuisine from './Cuisine';
import Recipe from './Recipe';

@ObjectType()
@Entity()
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Recipe, recipe => recipe.author)
  recipes: Recipe[];

  @OneToMany(type => Category, category => category.user)
  categories: Category[];

  @OneToMany(type => Cuisine, cuisine => cuisine.user)
  cuisines: Cuisine[];

  @Field()
  @Column()
  email: string;

  // SQLite does not support binary type.
  @Column(config.isTest ? 'varchar' : 'binary', {
    length: HASHED_PASSWORD_LENGTH,
  })
  password: string | Buffer;
}
