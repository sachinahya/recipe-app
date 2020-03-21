import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import config from '../config';
import { IDField } from '../helpers';
import Recipe from './Recipe';
import User from './User';

/**
 * SQLite does not support auto incrementing composite primary keys.
 */

@ObjectType()
@Entity()
@Unique(['user', 'name'])
export default class Category {
  @IDField()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
  @ManyToOne(
    type => User,
    user => user.categories,
    { nullable: false, primary: !config.isTest }
  )
  user: User;

  @ManyToMany(
    type => Recipe,
    recipe => recipe.categories
  )
  recipes: Recipe[];
}
