import { Field, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { IDField } from '../helpers';
import Recipe from './Recipe';

@ObjectType()
@InputType('NewStepInput')
@Entity('recipe_step')
export default class Step {
  @ManyToOne(type => Recipe, recipe => recipe.steps, { primary: true })
  recipe: Recipe;

  @IDField()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column('varchar', { length: 8000 })
  description: string;
}
