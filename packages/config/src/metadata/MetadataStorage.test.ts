import { MetadataStorage } from './MetadataStorage';

const target = jest.fn();

let storage: MetadataStorage;

beforeEach(() => {
  storage = new MetadataStorage();
});

it('adds entities', () => {
  const fn = storage.getEntity(target);
  const fn2 = storage.getEntity(target);

  expect(fn).toStrictEqual(fn2);
});
