import { Checkbox, ListItemText, MenuItem, TextField } from '@material-ui/core';
import { ensureArray, invariant } from '@sachinahya/utils';
import { spacing } from 'styles/styleSelectors';
import { InputItem, SelectBaseProps } from './Select.types';

export type SelectInputProps<T> = SelectBaseProps<T>;

const createItems = <T extends unknown>(
  items: T[],
  formatItem?: (item: T) => InputItem
): InputItem[] => {
  const fn =
    typeof items[0] == 'string'
      ? (item: string): InputItem => ({ label: item, value: item })
      : formatItem;

  invariant(fn, 'formatItem needs to be specified when items is an array of objects.');

  return items.map(fn as (item: T) => InputItem);
};

const SelectInput = <T extends unknown>({
  items,
  formatItem,
  value,
  multiple,
  dense,
  ...props
}: SelectInputProps<T>): JSX.Element => {
  invariant(
    (multiple && Array.isArray(items)) || !multiple,
    'items must be an array when multiple is specified.'
  );

  const parsedItems = createItems(items, formatItem);

  return (
    <TextField
      select
      margin={dense ? 'dense' : undefined}
      type="hidden"
      value={value}
      SelectProps={{
        multiple,
        renderValue: (value: unknown): string => {
          const selected = ensureArray(value) as string[];
          return parsedItems
            .filter(x => selected.includes(x.value))
            .map(x => x.label)
            .join(', ');
        },
      }}
      css={theme => ({
        '.MuiOutlinedInput-inputSelect': {
          paddingRight: spacing(4)(theme),
        },
      })}
      {...props}
    >
      {parsedItems.map(item => {
        const isChecked = multiple && Array.isArray(value) && value.includes(item.value);
        return (
          <MenuItem key={item.value} value={item.value}>
            {multiple && <Checkbox checked={isChecked} />}
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectInput;
