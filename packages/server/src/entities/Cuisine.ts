import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';
import Recipe from './Recipe';
import { IDField } from '../helpers';
import User from './User';

@ObjectType()
@Entity()
@Unique(['user', 'name'])
export default class Cuisine {
  @IDField()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(
    type => User,
    user => user.cuisines,
    { nullable: false, primary: true }
  )
  user: User;

  @ManyToMany(
    type => Recipe,
    recipe => recipe.cuisines
  )
  recipes: Recipe[];
}
