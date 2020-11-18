import { createContext, FC,useContext } from 'react';

import { SelectFieldProps } from './SelectField';
import { TextFieldProps } from './TextField';

type FieldContextType = Omit<TextFieldProps | SelectFieldProps<unknown>, 'variant'>;

const FieldContext = createContext<FieldContextType>({});

export const FieldContextProvider: FC<FieldContextType> = ({ children, ...props }) => {
  return <FieldContext.Provider value={props}>{children}</FieldContext.Provider>;
};

export const useFieldContext = (): FieldContextType => useContext(FieldContext);
