import { MetadataEntity } from './MetadataEntity';
import { MetadataStorage } from './MetadataStorage';
import { PropertyMetadata } from './types';

const target = jest.fn();
let entity: MetadataEntity;

beforeEach(() => {
  entity = new MetadataStorage().getEntity(target);
});

it('adds mappings', () => {
  const mapping: PropertyMetadata = { columnId: 'col', propertyKey: 'prop', type: String };
  entity.addColumnMapping(mapping);

  expect(entity.propertyMetadata).toEqual(
    new Map<string, PropertyMetadata>([['col', mapping]])
  );
});
