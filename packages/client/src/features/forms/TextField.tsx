import { TextField as MuiTextField } from '@material-ui/core';
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FastField, Field } from 'formik';
import React from 'react';
import { useFieldContext } from './FieldContext';

export type TextFieldProps = MuiTextFieldProps & {
  fast?: boolean;
  name: string;
};

const TextField: React.FC<TextFieldProps> = ({ name, fast, ...props }) => {
  /* if (!name) {
    throw new Error('Name is a required prop for TextInput.');
  } */
  const contextProps = useFieldContext();
  const FieldComponent = fast ? FastField : Field;

  return (
    <FieldComponent name={name}>
      {({ field, meta }: any) => (
        <MuiTextField
          {...contextProps}
          {...props}
          {...field}
          error={Boolean(meta.touched && meta.error)}
          helperText={
            meta.touched && meta.error ? meta.error : props.helperText
          }
        />
      )}
    </FieldComponent>
  );
};

export default TextField;
