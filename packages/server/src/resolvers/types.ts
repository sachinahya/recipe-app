import { Context } from 'apollo-server-core';

export type ResolverContext = {
  [K in keyof Context]-?: NonNullable<Context[K]>;
};
