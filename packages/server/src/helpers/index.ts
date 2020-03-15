import { Field, Int } from 'type-graphql';
import {
  AdvancedOptions,
  MethodAndPropDecorator,
  ReturnTypeFunc,
} from 'type-graphql/dist/decorators/types';
import { Column, ColumnOptions } from 'typeorm';

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export type Lazy<T> = T | Promise<T>;

export function NullableField(): MethodAndPropDecorator;
export function NullableField(options: AdvancedOptions): MethodAndPropDecorator;
export function NullableField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: AdvancedOptions
): MethodAndPropDecorator;
export function NullableField(
  returnTypeFunction?: AdvancedOptions | ReturnTypeFunc,
  options?: AdvancedOptions
) {
  if (typeof returnTypeFunction != 'function') {
    return Field({
      nullable: true,
      ...(returnTypeFunction as AdvancedOptions),
    });
  }
  return Field(returnTypeFunction, { nullable: true, ...options });
}

export function IDField(options?: AdvancedOptions): MethodAndPropDecorator {
  return Field(() => Int, options);
}

export function NullableColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}
