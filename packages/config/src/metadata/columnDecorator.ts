import { MetadataStorage } from '../metadata/MetadataStorage';
import { PropertyMetadataOptions } from '../metadata/types';
import { getPropertyType } from './reflection';

type ColumnDecoratorFactory<O = unknown> = (
  columnId: string,
  options?: PropertyMetadataOptions & O
) => PropertyDecorator;

export class SymbolsNotSupportedError extends Error {
  constructor() {
    super('Symbols are not supported as property keys.');
    this.name = 'SymbolsNotSupportedError';
  }
}

export const makeColumnDecorator = <O>(
  storage: MetadataStorage<unknown, PropertyMetadataOptions & O>
): ColumnDecoratorFactory<O> => {
  return (columnId, options) => (target, propertyKey) => {
    if (typeof propertyKey == 'symbol') throw new SymbolsNotSupportedError();
    const type = getPropertyType(target, propertyKey);

    storage
      .getEntity(target instanceof Function ? (target as any) : target.constructor)
      .addColumnMapping({
        propertyKey,
        columnId,
        type,
        options,
      });
  };
};
