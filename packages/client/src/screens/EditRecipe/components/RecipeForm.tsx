import { TabPanels } from 'components/Tabs';
import { FieldContextProvider } from 'features/forms/FieldContext';
import { RecipeInput } from 'features/graphql/types.generated';
import { FormValues } from 'features/recipes/RecipeFormValues';
import React from 'react';
import InfoPage from './InfoPage';
import IngredientsPage from './IngredientsPage';
import StepsPage from './StepsPage';

export type RecipeFormValues = FormValues<RecipeInput>;

const RecipeForm: React.FC = () => {
  return (
    <FieldContextProvider fullWidth margin="dense">
      <TabPanels>
        <InfoPage />
        <IngredientsPage />
        <StepsPage />
      </TabPanels>
    </FieldContextProvider>
  );
};

export default RecipeForm;
