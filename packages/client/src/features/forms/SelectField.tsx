import SelectInput, { SelectInputProps } from 'components/SelectInput/SelectInput';
import { useField } from 'formik';
import React from 'react';
import { useFieldContext } from './FieldContext';

export type SelectFieldProps<T> = SelectInputProps<T>;

const SelectField = <T extends any>({ name, ...props }: SelectFieldProps<T>) => {
  if (!name) {
    throw new Error('Name is a required prop for SelectField.');
  }
  const [field, meta] = useField(name);
  const contextProps = useFieldContext();

  return (
    <SelectInput
      {...contextProps}
      {...props}
      {...field}
      onChange={evt => {
        console.log(evt.target.value);
        field.onChange(evt);
      }}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default SelectField;
