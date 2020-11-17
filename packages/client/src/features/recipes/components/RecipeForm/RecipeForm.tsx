import { TabPanels } from 'components/Tabs';
import Pre from 'components/Typography/Pre';
import { convertToInput, schema } from 'features/recipes/formValues';
import { RecipeFieldsFragment } from 'features/recipes/fragments.gql';
import { RecipeInput } from 'features/types.gql';
import { setIn } from 'final-form';
import arrayMutators from 'final-form-arrays';
import gql from 'graphql-tag';
import React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import { Schema, ValidationError } from 'yup';

import { FieldContextProvider } from '../../../forms/FieldContext';
import InfoPage from './InfoPage';
import IngredientsPage from './IngredientsPage';
import {
  SaveRecipeMutation,
  useRecipeFormDataQuery,
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
  const [{ data: initialData }] = useRecipeFormDataQuery({
    variables: { id },
    pause: !id,
  });

  const [, addRecipe] = useSaveRecipeMutation();
  const { __typename, ...initialRecipe } = initialData?.recipe || ({} as RecipeFieldsFragment);
  const initialValues = convertToInput(initialRecipe);

  const handleSubmit = async (values: RecipeInput) => {
    try {
      const data = schema.validateSync(values);
      console.log(data);
      if (data) {
        const { data: result, error } = await addRecipe({ data });
        if (error) throw error;
        onSubmitted?.(result?.addRecipe);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form<RecipeInput>
      key={initialRecipe.id || 0}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
      mutators={{ ...arrayMutators }}
      {...props}
    >
      {({ handleSubmit, values }) => (
        <StyledForm onSubmit={handleSubmit} ref={ref}>
          <Pre>{JSON.stringify(values, undefined, 2)}</Pre>
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
