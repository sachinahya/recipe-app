import { TextField as MuiTextField } from '@material-ui/core';
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FC } from 'react';
import { Field } from 'react-final-form';

import { useFieldContext } from './FieldContext';

export type TextFieldProps = MuiTextFieldProps & {
  fast?: boolean;
  name: string;
};

const TextField: FC<TextFieldProps> = ({ name, fast, ...props }) => {
  const contextProps = useFieldContext();

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <MuiTextField
          {...contextProps}
          {...props}
          {...input}
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error ? meta.error : props.helperText}
        />
      )}
    </Field>
  );
};

export default TextField;
