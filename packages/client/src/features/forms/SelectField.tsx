import SelectInput, { SelectInputProps } from 'components/SelectInput/SelectInput';
import { useField } from 'react-final-form';
import { useFieldContext } from './FieldContext';

export type SelectFieldProps<T> = SelectInputProps<T>;

const SelectField = <T extends unknown>({ name, ...props }: SelectFieldProps<T>): JSX.Element => {
  if (!name) {
    throw new Error('Name is a required prop for SelectField.');
  }
  const { input, meta } = useField(name);
  const contextProps = useFieldContext();

  return (
    <SelectInput
      {...contextProps}
      {...props}
      {...input}
      onChange={evt => {
        input.onChange(evt);
      }}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default SelectField;
