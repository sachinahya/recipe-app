import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AddButton, DeleteIconButton } from 'components/Button';
import { TabPanel } from 'components/Tabs';
import { Heading } from 'components/Typography';
import TextField from 'features/forms/TextField';
import { FC } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';

import { FormSection } from './FormSection';

const StepHeading = styled(Heading).attrs({
  component: 'h2',
  variant: 'h5',
})`
  flex-grow: 1;
`;

const StepsPage: FC = () => {
  return (
    <TabPanel index={2}>
      <FieldArray name="steps">
        {({ fields }) => (
          <>
            {fields.map((name, i) => {
              return (
                <FormSection key={name}>
                  <Box display="flex" alignItems="center">
                    <StepHeading>Step {i + 1}</StepHeading>
                    <DeleteIconButton onClick={() => fields.remove(i)} />
                  </Box>
                  <TextField multiline rows={3} id={`step-${name}`} name={`${name}.description`} />
                </FormSection>
              );
            })}
            <Box textAlign="center" mt={3}>
              <AddButton
                startIcon={<AddIcon />}
                onClick={() =>
                  fields.push({
                    id: ((fields?.length || 0) + 1).toString(),
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
