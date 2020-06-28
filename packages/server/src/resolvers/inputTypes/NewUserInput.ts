import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../auth/constants';
import User from '../../entities/User';
import { IDField } from '../../helpers';

@InputType()
export default class NewUserInput implements Partial<User> {
  @IDField({ nullable: true })
  id?: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  plainTextPassword: string;
}
