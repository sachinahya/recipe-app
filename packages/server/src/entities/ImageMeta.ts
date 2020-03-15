import { Field, Int, ObjectType } from 'type-graphql';
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { NullableColumn } from '../helpers';
import Recipe from './Recipe';

@ObjectType()
@Entity()
export default class ImageMeta {
  @Field()
  @PrimaryColumn()
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

  /* @Column('varbinary')
  hash: string; */

  @Field()
  @CreateDateColumn()
  creationDate: Date;

  @Field()
  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToOne(type => Recipe, { nullable: true })
  recipe?: Recipe;

  @Field(type => Int, { nullable: true })
  @NullableColumn()
  order?: number;
}
