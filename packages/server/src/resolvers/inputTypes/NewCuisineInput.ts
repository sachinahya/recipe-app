import { InputType } from 'type-graphql';

import Cuisine from '../../entities/Cuisine';
import { IDField, NullableField } from '../../helpers';

@InputType()
export default class NewCuisineInput implements Partial<Cuisine> {
  @IDField({ nullable: true })
  id?: number;

  @NullableField()
  name?: string;
}
