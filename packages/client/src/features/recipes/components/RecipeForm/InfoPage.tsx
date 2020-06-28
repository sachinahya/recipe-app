import { Grid, InputAdornment } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { ProgressOverlay } from 'components/Progress';
import { ItemFormatter } from 'components/SelectInput';
import { TabPanel } from 'components/Tabs';
import SelectField from 'features/forms/SelectField';
import TextField, { TextFieldProps } from 'features/forms/TextField';
import gql from 'graphql-tag';
import React from 'react';

import ImageSelector from '../ImageSelector/ImageSelector';
import { FormSection } from './FormSection';
import { useUserCategoriesQuery, useUserCuisinesQuery } from './InfoPage.gql';

const USER_CATEGORIES_QUERY = gql`
  query userCategories {
    userCategories {
      ...CategoryFields
    }
  }
`;

const USER_CUISINES_QUERY = gql`
  query userCuisines {
    userCuisines {
      ...CuisineFields
    }
  }
`;

const TimeField: React.FC<TextFieldProps> = props => (
  <TextField
    {...props}
    helperText="Minutes"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <TimerIcon />
        </InputAdornment>
      ),
    }}
  />
);

const formatSelectItem: ItemFormatter<{ id: number; name: string }> = item => ({
  label: item.name,
  value: item.id.toString(),
});

const InfoPage: React.FC = () => {
  const { data: categories, loading: categoriesLoading } = useUserCategoriesQuery();
  const { data: cuisines, loading: cuisinesLoading } = useUserCuisinesQuery();

  return (
    <TabPanel index={0}>
      <FormSection>
        <TextField name="title" id="title" label="Title" />
      </FormSection>
      <FormSection>
        <TextField name="description" id="description" label="Description" multiline rows={3} />
      </FormSection>

      <FormSection>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <ProgressOverlay fullWidth show={categoriesLoading}>
              <SelectField
                multiple
                name="categories"
                id="categories"
                label="Categories"
                disabled={!categories}
                items={categories ? categories.userCategories : []}
                formatItem={formatSelectItem}
              />
            </ProgressOverlay>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProgressOverlay fullWidth show={cuisinesLoading}>
              <SelectField
                multiple
                name="cuisines"
                id="cuisines"
                label="Cuisines"
                disabled={!cuisines}
                items={cuisines ? cuisines.userCuisines : []}
                formatItem={formatSelectItem}
              />
            </ProgressOverlay>
          </Grid>
        </Grid>
      </FormSection>

      <FormSection>
        <Grid container spacing={1}>
          <Grid item xs sm={2}>
            <TimeField name="prepTime" id="prepTime" label="Prep Time" />
          </Grid>
          <Grid item xs sm={2}>
            <TimeField name="cookTime" id="cookTime" label="Cook Time" />
          </Grid>
          <Grid item xs sm={2}>
            <TextField name="yield" id="yield" label="Servings" />
          </Grid>
        </Grid>
      </FormSection>

      <FormSection>
        <ImageSelector />
      </FormSection>

      <FormSection>
        <TextField name="sourceUrl" id="sourceUrl" label="Source Link" />
      </FormSection>
    </TabPanel>
  );
};

export default InfoPage;
