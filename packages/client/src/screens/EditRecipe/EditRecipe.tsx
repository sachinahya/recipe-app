import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import RecipeForm from 'features/recipes/components/RecipeForm';
import { useRecipeIdParam } from 'features/recipes/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';
import EditRecipeHeader from './components/EditRecipeHeader';

const EditRecipe: React.FC = () => {
  const id = useRecipeIdParam({ required: false });
  const { push } = useHistory();

  const isEdit = !!id;
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const onSave = () => formRef.current?.dispatchEvent(new Event('submit'));

  return (
    <TabsProvider>
      <AuthBoundary fallback={<Header title="" />}>
        <EditRecipeHeader isEdit={isEdit} onSave={onSave} />
      </AuthBoundary>
      <Screen title="Edit Recipe" maxWidth="md">
        <AuthBoundary fallback={<LoginScreen />}>
          <RecipeForm
            id={id}
            onSubmitted={id => push(id ? `/recipes/${id}` : '/recipes')}
            ref={formRef}
          />
        </AuthBoundary>
      </Screen>
    </TabsProvider>
  );
};

export default EditRecipe;
