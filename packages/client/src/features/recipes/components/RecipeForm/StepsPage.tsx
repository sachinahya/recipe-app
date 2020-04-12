import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AddButton, DeleteIconButton } from 'components/Button';
import { TabPanel } from 'components/Tabs';
import { Heading } from 'components/Typography';
import TextField from 'features/forms/TextField';
import { RecipeFormValues } from 'features/recipes/formValues';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { FormSection } from './FormSection';

const StepHeading = styled(Heading).attrs({
  component: 'h2',
  variant: 'h5',
})`
  flex-grow: 1;
`;

const StepsPage: React.FC = () => {
  const { values } = useFormikContext<RecipeFormValues>();

  return (
    <TabPanel index={2}>
      <FieldArray name="steps">
        {arrayHelpers => (
          <>
            {values.steps &&
              values.steps.map((step, i) => {
                return (
                  <FormSection key={i}>
                    <Box display="flex" alignItems="center">
                      <StepHeading>Step {i + 1}</StepHeading>
                      <DeleteIconButton onClick={() => arrayHelpers.remove(i)} />
                    </Box>
                    <TextField
                      multiline
                      rows={3}
                      id={`step-${i}`}
                      name={`steps[${i}].description`}
                    />
                  </FormSection>
                );
              })}
            <Box textAlign="center" mt={3}>
              <AddButton
                startIcon={<AddIcon />}
                onClick={() =>
                  arrayHelpers.push({
                    id: ((values.steps || []).length + 1).toString(),
                    description: '',
                  })
                }
              >
                Add Step
              </AddButton>
            </Box>
          </>
        )}
      </FieldArray>
    </TabPanel>
  );
};

export default StepsPage;
