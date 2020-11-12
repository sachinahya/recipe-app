import { TextField as MuiTextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useFieldContext } from 'features/forms/FieldContext';
import { CategoryFieldsFragment, CuisineFieldsFragment } from 'features/recipes/fragments.gql';
import React, { FC } from 'react';
import { useField } from 'react-final-form';

interface CategoryAutocompleteProps {
  name: string;
  label: string;
  options?: (CategoryFieldsFragment | CuisineFieldsFragment)[];
}

const filter = createFilterOptions<CategoryFieldsFragment | CuisineFieldsFragment>();

const CategoryAutocomplete: FC<CategoryAutocompleteProps> = ({ name, label, options = [] }) => {
  const { input, meta } = useField(name);
  const contextProps = useFieldContext();

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      multiple
      id="categories"
      value={input.value}
      options={options}
      getOptionLabel={option => option.name || ''}
      disabled={!options}
      renderInput={params => (
        <MuiTextField
          {...contextProps}
          {...params}
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          label={label}
        />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            id: -1,
            name: params.inputValue,
          });
        }

        return filtered;
      }}
      onChange={(evt, newValue) => {
        input.onChange(newValue);
      }}
    />
  );
};

export default CategoryAutocomplete;
