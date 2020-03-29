import Screen from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import RecipeForm from 'features/recipes/components/RecipeForm';
import { useRecipeIdParam } from 'features/recipes/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import EditRecipeHeader from './components/EditRecipeHeader';

const EditRecipe: React.FC = () => {
  const id = useRecipeIdParam();
  const { push } = useHistory();

  const isEdit = !!id;
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const onSave = () => formRef.current?.dispatchEvent(new Event('submit'));

  return (
    <TabsProvider>
      <EditRecipeHeader isEdit={isEdit} onSave={onSave} />
      <Screen title="Edit Recipe" maxWidth="md">
        <RecipeForm
          id={id}
          onSubmitted={id => push(id ? `/recipes/${id}` : '/recipes')}
          ref={formRef}
        />
      </Screen>
    </TabsProvider>
  );
};

export default EditRecipe;
