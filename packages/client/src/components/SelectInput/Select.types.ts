import { BaseTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

export interface InputItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export type ItemFormatter<T> = (item: T) => InputItem;

export interface SelectBaseProps<T> extends Omit<BaseTextFieldProps, 'variant'> {
  /**
   * Items to be shown in the dropdown list.
   */
  items: T[];
  /**
   * Function that transforms the items of type `T` to the `InputItem` type.
   * Optional if `items` is a string array.
   */
  formatItem?: ItemFormatter<T>;
  /**
   * Value of the select input.
   */
  value?: string | string[];
  /**
   * Whether the select input allows multiple selection.
   * If true then `value` must be an array.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * Whether the component takes up the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * Show a smaller field with less padding for dense forms.
   *
   * @default false
   */
  dense?: boolean;
  /**
   * Handler when an item is selected.
   */
  onChange?: (evt: React.ChangeEvent<{ value: unknown }>) => void;
}
