import { gql } from '@apollo/client';
import { TabPanels } from 'components/Tabs';
import { convertToInput } from 'features/recipes/formValues';
import { RecipeInput } from 'features/types.gql';
import { setIn } from 'final-form';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import { Schema, ValidationError } from 'yup';

import { FieldContextProvider } from '../../../forms/FieldContext';
import { schema } from '../../formValues';
import InfoPage from './InfoPage';
import IngredientsPage from './IngredientsPage';
import {
  SaveRecipeMutation,
  useRecipeFormDataLazyQuery,
  useSaveRecipeMutation,
} from './RecipeForm.gql';
import StepsPage from './StepsPage';

interface RecipeFormProps extends React.RefAttributes<HTMLFormElement> {
  id: number;
  onSubmitted?(recipe?: SaveRecipeMutation['addRecipe']): void;
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

const StyledForm = styled('form')`
  display: inherit;
  flex-direction: inherit;
  flex-grow: inherit;
  overflow: inherit;
`;

const makeYupValidator = <T extends unknown>(schema: Schema<T>) => (
  values: T
): Record<string, string> | undefined => {
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return err.inner.reduce((errors, error) => setIn(errors, error.path, error.message), {});
    }
    throw err;
  }
};

const validate = makeYupValidator(schema);

const RecipeForm: React.FC<RecipeFormProps> = React.forwardRef(function RecipeForm(
  { id, onSubmitted, ...props },
  ref
) {
  const [getRecipe, { data }] = useRecipeFormDataLazyQuery({
    variables: { id },
  });

  React.useEffect(() => {
    if (id) getRecipe();
  }, [getRecipe, id]);

  const [addRecipe] = useSaveRecipeMutation();
  const initialData = convertToInput(data?.recipe);

  const handleSubmit = async (values: RecipeInput) => {
    try {
      const data = schema.validateSync(values);
      console.log(data);
      if (data) {
        const { data: result } = await addRecipe({ variables: { data } });
        onSubmitted?.(result?.addRecipe);
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log('initialData', initialData);

  return (
    <Form<RecipeInput>
      key={initialData?.id || 0}
      initialValues={initialData}
      onSubmit={handleSubmit}
      validate={validate}
      mutators={{ ...arrayMutators }}
      {...props}
    >
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit} ref={ref}>
          <FieldContextProvider fullWidth margin="dense">
            <TabPanels>
              <InfoPage />
              <IngredientsPage />
              <StepsPage />
            </TabPanels>
          </FieldContextProvider>
        </StyledForm>
      )}
    </Form>
  );
});

export default RecipeForm;
