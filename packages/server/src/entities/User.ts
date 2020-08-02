import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { HASHED_PASSWORD_LENGTH } from '../auth/constants';
import config from '../config';
import { NullableColumn } from '../helpers';
import Category from './Category';
import Cuisine from './Cuisine';
import Recipe from './Recipe';

// SQLite does not support binary type.
const PasswordColumn = () =>
  config.isTest
    ? Column('varchar', {
        nullable: true,
        length: HASHED_PASSWORD_LENGTH,
      })
    : Column('bytea', {
        nullable: true,
      });

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

  @PasswordColumn()
  password: string | Buffer;

  @NullableColumn()
  googleId?: string;
}
