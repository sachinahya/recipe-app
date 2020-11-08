import { ReflectionTypes } from './reflection';

export type Newable<T> = { new (...args: any[]): T };

export type PropertySetter = (propertyKey: string, value: string) => boolean;

export type CastFn = (val: unknown) => any;

export interface PropertyMetadataOptions {
  castFn?: CastFn;
}

export interface PropertyMetadata<
  TPropertyOptions extends PropertyMetadataOptions = PropertyMetadataOptions
> {
  propertyKey: string;
  columnId: string;
  type: ReflectionTypes;
  options?: TPropertyOptions;
}
