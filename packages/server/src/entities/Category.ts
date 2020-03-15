import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IDField } from '../helpers';
import Recipe from './Recipe';
import User from './User';

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
    { nullable: false, primary: true }
  )
  user: User;

  @ManyToMany(
    type => Recipe,
    recipe => recipe.categories
  )
  recipes: Recipe[];
}
