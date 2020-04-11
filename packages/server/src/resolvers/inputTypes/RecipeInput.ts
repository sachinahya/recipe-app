import { Field, InputType, Int } from 'type-graphql';
import { DeepPartial } from 'typeorm';
import NewCategoryInput from './NewCategoryInput';
import { NewIngredientInput } from '../../entities/Ingredient';
import Recipe from '../../entities/Recipe';
import Step from '../../entities/Step';
import { NullableField, IDField } from '../../helpers';
import NewCuisineInput from './NewCuisineInput';
import User from '../../entities/User';
import StagedImage from './StagedImage';

@InputType()
export default class RecipeInput implements DeepPartial<Recipe> {
  @IDField({ nullable: true })
  id?: number;

  @Field()
  title: string;

  @NullableField()
  description?: string;

  author: User;

  @NullableField(type => [NewCategoryInput])
  categories?: NewCategoryInput[];

  @NullableField(type => [NewCuisineInput])
  cuisines?: NewCuisineInput[];

  @NullableField({
    deprecationReason: 'Only used for imported recipes. Use "images" instead.',
  })
  imageUrl?: string;

  @NullableField(type => [StagedImage])
  stagedImages?: StagedImage[];

  @NullableField(type => Int)
  prepTime?: number;

  @NullableField(type => Int)
  cookTime?: number;

  @NullableField(type => Int)
  yield?: number;

  @NullableField(type => [NewIngredientInput])
  ingredients?: NewIngredientInput[];

  @NullableField(type => [Step])
  steps?: Step[];

  @NullableField()
  sourceUrl?: string;
}
