import SaveIcon from '@material-ui/icons/Save';
import { Header, HeaderAction } from 'components/Layout';
import Progress from 'components/Progress';
import Screen from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import { useRecipeIdParam } from 'features/recipes/hooks';
import { useAddRecipeMutation, useRecipeSingleLazyQuery } from 'features/recipes/queries.generated';
import {
  convertFromFormValues,
  convertToFormValues,
  schema,
} from 'features/recipes/RecipeFormValues';
import RecipeTabs from 'features/recipes/RecipeTabs';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import RecipeForm, { RecipeFormValues } from './components/RecipeForm';

const EditRecipe: React.FC = () => {
  const id = useRecipeIdParam();
  const { push } = useHistory();

  const [getRecipe, { data }] = useRecipeSingleLazyQuery({
    variables: { id },
  });
  const [addRecipe, { loading: mutationLoading }] = useAddRecipeMutation();
  const initialData = convertToFormValues((id && data?.recipe) || undefined);

  React.useEffect(() => {
    if (id) getRecipe();
  }, [getRecipe, id]);

  const handleSubmit = (values: any) => {
    addRecipe({
      variables: { data: convertFromFormValues(values) },
    })
      .then(({ data }) => {
        const id = data?.addRecipe.id;
        push(id ? `/recipes/${id}` : '/recipes');
      })
      .catch(console.error);
  };

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const formLoaded = (id && data?.recipe) || !id;
  const isEdit = !!id;

  return (
    <TabsProvider>
      <Header
        variant={isEdit ? 'back' : undefined}
        title={isEdit ? 'Edit Recipe' : 'New Recipe'}
        tabs={<RecipeTabs />}
        actions={
          <HeaderAction
            icon={<SaveIcon />}
            disabled={mutationLoading}
            onClick={() => formRef.current?.dispatchEvent(new Event('submit'))}
          />
        }
      />
      <Screen title="Edit Recipe" maxWidth="md">
        {formLoaded ? (
          <Formik<RecipeFormValues>
            initialValues={initialData}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {() => (
              <StyledForm ref={formRef}>
                <RecipeForm />
              </StyledForm>
            )}
          </Formik>
        ) : (
          <Progress />
        )}
      </Screen>
    </TabsProvider>
  );
};

const StyledForm = styled(Form)`
  display: inherit;
  flex-direction: inherit;
  flex-grow: inherit;
  overflow: inherit;
`;

export default EditRecipe;
