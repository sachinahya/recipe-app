import { TabPanels } from 'components/Tabs';
import { RecipeFormValues } from 'features/recipes/formValues';
import { Form, Formik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

import { FieldContextProvider } from '../../../forms/FieldContext';
import { convertFromFormValues, convertToFormValues, schema } from '../../formValues';
import InfoPage from './InfoPage';
import IngredientsPage from './IngredientsPage';
import { useRecipeFormDataLazyQuery, useSaveRecipeMutation } from './RecipeForm.gql';
import StepsPage from './StepsPage';

interface RecipeFormProps extends React.RefAttributes<HTMLFormElement> {
  id: number;
  onSubmitted?(recipeId?: number): void;
}

const SAVE_RECIPE_MUTATION = gql`
  mutation saveRecipe($data: RecipeInput!) {
    addRecipe(data: $data) {
      ...RecipeFields
    }
  }
`;

const RECIPE_FORM_DATA_QUERY = gql`
  query recipeFormData($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
`;

const StyledForm = styled(Form)`
  display: inherit;
  flex-direction: inherit;
  flex-grow: inherit;
  overflow: inherit;
`;

const RecipeForm: React.FC<RecipeFormProps> = React.forwardRef(
  ({ id, onSubmitted, ...props }, ref) => {
    const [getRecipe, { data }] = useRecipeFormDataLazyQuery({
      variables: { id },
    });

    React.useEffect(() => {
      if (id) getRecipe();
    }, [getRecipe, id]);

    const [addRecipe] = useSaveRecipeMutation();
    const initialData = convertToFormValues((id && data?.recipe) || undefined);

    const handleSubmit = async (values: RecipeFormValues) => {
      try {
        const variables = { data: convertFromFormValues(values) };
        const { data } = await addRecipe({ variables });
        onSubmitted?.(data?.addRecipe.id);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <Formik<RecipeFormValues>
        key={initialData.id}
        initialValues={initialData}
        validationSchema={schema}
        onSubmit={handleSubmit}
        {...props}
      >
        {() => (
          <StyledForm ref={ref}>
            <FieldContextProvider fullWidth margin="dense">
              <TabPanels>
                <InfoPage />
                <IngredientsPage />
                <StepsPage />
              </TabPanels>
            </FieldContextProvider>
          </StyledForm>
        )}
      </Formik>
    );
  }
);

RecipeForm.displayName = 'RecipeForm';

export default RecipeForm;
