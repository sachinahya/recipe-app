import { Field, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { IDField,NullableColumn, NullableField } from '../helpers';
import Recipe from './Recipe';

@ObjectType()
@InputType('NewIngredientInput')
class IngredientBase {
  @IDField()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  item: string;

  @NullableField()
  @NullableColumn()
  measure?: string;

  @NullableField()
  @NullableColumn()
  group?: string;

  @NullableField()
  @NullableColumn()
  notes?: string;
}

@ObjectType()
@Entity('recipe_ingredient')
export default class Ingredient extends IngredientBase {
  @ManyToOne(type => Recipe, recipe => recipe.ingredients, { primary: true })
  recipe: Recipe;
}

export { IngredientBase as NewIngredientInput };
