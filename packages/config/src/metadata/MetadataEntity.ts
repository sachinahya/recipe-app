import { makePropertySetter } from './makePropertySetter';
import { Newable, PropertyMetadata, PropertyMetadataOptions, PropertySetter } from './types';

export class MetadataEntity<
  TEntityOptions = unknown,
  TPropertyOptions extends PropertyMetadataOptions = PropertyMetadataOptions
> {
  get propertyMetadata(): ReadonlyMap<string, PropertyMetadata<TPropertyOptions>> {
    return this.#propertyMetadata;
  }

  options: TEntityOptions;

  readonly propertySetter: PropertySetter;

  readonly name: string;

  readonly #propertyMetadata = new Map<string, PropertyMetadata<TPropertyOptions>>();

  constructor(target: Newable<unknown>) {
    this.name = target.name;
    this.propertySetter = makePropertySetter(target, this);
  }

  addColumnMapping(mapping: PropertyMetadata<TPropertyOptions>): void {
    this.#propertyMetadata.set(mapping.columnId, mapping);
  }
}
