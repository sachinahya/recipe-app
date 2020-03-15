import React from 'react';
import { SelectFieldProps } from './SelectField';
import { TextFieldProps } from './TextField';

type FieldContextType = Omit<TextFieldProps | SelectFieldProps<any>, 'variant'>;

const FieldContext = React.createContext<FieldContextType>({});

export const FieldContextProvider: React.FC<FieldContextType> = ({
  children,
  ...props
}) => {
  return (
    <FieldContext.Provider value={props}>{children}</FieldContext.Provider>
  );
};

export const useFieldContext = () => React.useContext(FieldContext);
