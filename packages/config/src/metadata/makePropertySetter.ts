import { MetadataEntity } from './MetadataEntity';
import { ReflectionTypes } from './reflection';
import { CastError, castType } from './typeCasting';
import { CastFn, PropertySetter } from './types';

const castValue = (value: unknown, type: ReflectionTypes, castFn?: CastFn) => {
  let newVal: string | number;
  if (castFn) {
    newVal = castFn(value);
    if (newVal?.constructor !== type) throw new CastError(type, value, newVal);
  } else {
    /**
     * TODO: This doesn't handle values that are not strings, e.g. booleans that come from bit
     * fields in SQL. We need to enhance this.
     */
    newVal = type !== String && typeof value == 'string' ? castType(type, value) : value;
  }

  return newVal;
};

export const makePropertySetter = (target: any, entity: MetadataEntity): PropertySetter => {
  return function (this: Record<string, unknown>, columnId, value) {
    if (!(this instanceof target)) {
      console.error("Value of 'this' is not of the entity type.");
      return false;
    }

    const mapping = entity.propertyMetadata.get(columnId);
    if (!mapping) {
      // TODO: We need to log a warning here but only once per column.
      // logger.error('Mapping not registered.');
      return false;
    }

    const newVal = castValue(value, mapping.type, mapping.options?.castFn);
    this[mapping.propertyKey] = newVal;
    return true;
  };
};
