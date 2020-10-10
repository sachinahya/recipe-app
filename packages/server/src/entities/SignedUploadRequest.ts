import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class SignedUploadRequest {
  @Field()
  filename: string;

  // @Field()
  // publicUrl: string;

  @Field()
  signedUrl: string;

  @Field()
  expires: number;
}
