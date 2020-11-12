import { Box, Grid } from '@material-ui/core';
import { AddButton } from 'components/Button';
import { TabPanel } from 'components/Tabs';
import React from 'react';
import { FieldArray } from 'react-final-form-arrays';

import { FormSection } from './FormSection';
import IngredientRow from './IngredientRow';

const IngredientsPage: React.FC = () => {
  return (
    <TabPanel index={1}>
      <FormSection>
        <FieldArray name="ingredients">
          {({ fields }) => (
            <>
              <Grid container>
                {fields.map((name, i) => (
                  <IngredientRow
                    key={name}
                    name={name}
                    index={i}
                    onDelete={() => fields.remove(i)}
                  />
                ))}
              </Grid>
              <Box textAlign="center" mt={3}>
                <AddButton
                  onClick={() =>
                    fields.push({
                      id: ((fields?.length || 0) + 1).toString(),
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
