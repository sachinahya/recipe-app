import { Field, InputType, Int } from 'type-graphql';

import { ImageBase } from '../../entities/ImageMeta';
import { NullableField } from '../../helpers';

@InputType()
export default class ImageInput implements ImageBase {
  @NullableField()
  id?: string;

  @NullableField()
  filename?: string;

  @NullableField()
  url?: string;

  @NullableField()
  caption?: string;

  @Field(type => Int)
  order: number;
}
