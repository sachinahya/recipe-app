import type { UpdateResolver } from '@urql/exchange-graphcache';
import type { Mutation } from 'src/features/types.gql';

export type FieldUpdateResolver<K extends keyof Mutation> = {
  [P in K]: UpdateResolver;
};
