import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDField, Lazy, NullableColumn, NullableField } from '../helpers';
import Category from './Category';
import Cuisine from './Cuisine';
import ImageMeta from './ImageMeta';
import Ingredient from './Ingredient';
import Step from './Step';
import User from './User';

@ObjectType()
@Entity()
export default class Recipe {
  @IDField()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @NullableField()
  @NullableColumn({ length: 8000 })
  description?: string;

  @Field()
  @CreateDateColumn()
  creationDate: Date;

  @Field()
  @UpdateDateColumn()
  modifiedDate: Date;

  @Field(type => User)
  @ManyToOne(type => User, user => user.recipes, { lazy: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  author: Lazy<User>;

  @Field(type => [Category])
  @ManyToMany(type => Category, category => category.recipes, { lazy: true })
  @JoinTable()
  categories: Lazy<Category[]>;

  @Field(type => [Cuisine])
  @ManyToMany(type => Cuisine, cuisine => cuisine.recipes, { lazy: true })
  @JoinTable()
  cuisines: Lazy<Cuisine[]>;

  @NullableField({
    deprecationReason: 'Only used for imported recipes. Use "images" instead.',
  })
  @NullableColumn()
  imageUrl?: string;

  @NullableField(type => [ImageMeta])
  @OneToMany(type => ImageMeta, image => image.recipe, { cascade: true, lazy: true })
  images?: Lazy<ImageMeta[]>;

  @NullableField()
  @NullableColumn()
  prepTime?: number;

  @NullableField()
  @NullableColumn()
  cookTime?: number;

  @NullableField()
  @NullableColumn()
  yield?: number;

  @NullableField()
  @NullableColumn()
  sourceUrl?: string;

  @Field(type => [Ingredient])
  @OneToMany(type => Ingredient, ingredient => ingredient.recipe, { cascade: true, lazy: true })
  ingredients: Lazy<Ingredient[]>;

  @Field(returns => [Step])
  @OneToMany(type => Step, step => step.recipe, { cascade: true, lazy: true })
  steps: Lazy<Step[]>;
}
