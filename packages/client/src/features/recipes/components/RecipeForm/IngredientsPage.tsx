import { Box, Grid } from '@material-ui/core';
import { AddButton } from 'components/Button';
import { TabPanel } from 'components/Tabs';
import { RecipeFormValues } from 'features/recipes/formValues';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';

import { FormSection } from './FormSection';
import IngredientRow from './IngredientRow';

const IngredientsPage: React.FC = () => {
  const { values } = useFormikContext<RecipeFormValues>();

  return (
    <TabPanel index={1}>
      <FormSection>
        <FieldArray name="ingredients">
          {arrayHelpers => (
            <>
              <Grid container>
                {values.ingredients &&
                  values.ingredients.length > 0 &&
                  values.ingredients.map((ingredient, i) => (
                    <IngredientRow key={i} index={i} onDelete={() => arrayHelpers.remove(i)} />
                  ))}
              </Grid>
              <Box textAlign="center" mt={3}>
                <AddButton
                  onClick={() =>
                    arrayHelpers.push({
                      id: ((values.ingredients || []).length + 1).toString(),
                      item: '',
                      quantity: '',
                      group: '',
                      measure: '',
                    })
                  }
                >
                  Add Ingredient
                </AddButton>
              </Box>
            </>
          )}
        </FieldArray>
      </FormSection>
    </TabPanel>
  );
};

export default IngredientsPage;
