import { InputType } from 'type-graphql';

import Category from '../../entities/Category';
import { IDField, NullableField } from '../../helpers';

@InputType()
export default class NewCategoryInput implements Partial<Category> {
  @IDField({ nullable: true })
  id?: number;

  @NullableField()
  name?: string;
}
