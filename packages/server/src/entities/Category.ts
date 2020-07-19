import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IDField } from '../helpers';
import Recipe from './Recipe';
import User from './User';

/**
 * SQLite does not support auto incrementing composite primary keys.
 */

@ObjectType()
@Entity()
@Unique(['name', 'user'])
export default class Category {
  @IDField()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(type => User, user => user.categories, { nullable: false })
  user: User;

  @ManyToMany(type => Recipe, recipe => recipe.categories)
  recipes: Recipe[];
}
