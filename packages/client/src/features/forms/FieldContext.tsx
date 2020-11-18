import React from 'react';

import { SelectFieldProps } from './SelectField';
import { TextFieldProps } from './TextField';

type FieldContextType = Omit<TextFieldProps | SelectFieldProps<unknown>, 'variant'>;

const FieldContext = React.createContext<FieldContextType>({});

export const FieldContextProvider: React.FC<FieldContextType> = ({ children, ...props }) => {
  return <FieldContext.Provider value={props}>{children}</FieldContext.Provider>;
};

export const useFieldContext = (): FieldContextType => React.useContext(FieldContext);
