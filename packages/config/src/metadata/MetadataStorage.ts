import { MetadataEntity } from './MetadataEntity';
import { Newable, PropertyMetadataOptions } from './types';

export class MetadataStorage<
  TEntityOptions = unknown,
  TPropertyOptions extends PropertyMetadataOptions = PropertyMetadataOptions
> {
  readonly #entities = new Map<
    Newable<unknown>,
    MetadataEntity<TEntityOptions, TPropertyOptions>
  >();

  getEntity(target: Newable<unknown>): MetadataEntity<TEntityOptions, TPropertyOptions> {
    const entity = this.#entities.get(target);
    if (!entity) this.#entities.set(target, new MetadataEntity(target));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#entities.get(target)!;
  }
}
