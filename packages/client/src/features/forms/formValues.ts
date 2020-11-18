import { string, StringSchema, TransformFunction } from 'yup';

export type FormValues<T> = {
  // TODO: This is going to be removed soon.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: Array<any> extends T[K] ? any[] : any;
};

export const emptyStringToUndefined: TransformFunction<StringSchema> = function (value) {
  if (this.isType(value) || value === null) return value?.trim() || undefined;
  return value;
};

export const emptyString = (): StringSchema<string | undefined> =>
  string().transform(emptyStringToUndefined);

export const trimStringValue = (str: string | null | undefined): string | undefined =>
  str ? str.trim() : undefined;

export const stringToNumber = (str: string | null | undefined): number | undefined =>
  str ? Number(str) : undefined;

export const numberToString = (num: number | null | undefined): string =>
  num ? num.toString() : '';

export const toIdObject = (str: string | null | undefined): { id: number } => ({
  id: Number(str),
});
