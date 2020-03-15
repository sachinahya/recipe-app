import { Field, InputType, Int } from 'type-graphql';

@InputType()
export default class StagedImage {
  @Field()
  id: string;

  @Field(type => Int)
  order: number;
}
