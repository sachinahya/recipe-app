import { Field, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { NullableColumn, NullableField } from '../helpers';
import Recipe from './Recipe';

export interface ImageBase {
  id?: string;
  filename?: string;
  url?: string;
  caption?: string;
  order: number;
}

@ObjectType()
@Entity()
export default class ImageMeta implements ImageBase {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The URL is used by the client to find the image so it cannot be nullable.
   * However, it may be null in the DB to allow the URL to be derived from
   * other methods such as the filename.
   */
  @Field({ nullable: false })
  @NullableColumn()
  url?: string;

  // aspectRatio
  // averageColor - for whilst image is loading etc.
  // lowResVersion

  @NullableColumn()
  filename?: string;

  @NullableColumn()
  mimetype?: string;

  @NullableField()
  @NullableColumn()
  caption?: string;

  @Field()
  @CreateDateColumn()
  creationDate: Date;

  @Field()
  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToOne(type => Recipe, { nullable: true })
  recipe?: Recipe;

  @Field(type => Int)
  @Column()
  order: number;
}
