import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import RecipeForm from 'features/recipes/components/RecipeForm';
import { useRecipeIdParam } from 'features/recipes/hooks';
import { FC,useRef } from 'react';
import { useHistory } from 'react-router-dom';

import EditRecipeHeader from './components/EditRecipeHeader';

const EditRecipe: FC = () => {
  const id = useRecipeIdParam({ required: false });
  const { goBack } = useHistory();

  const isEdit = !!id;
  const formRef = useRef<HTMLFormElement | null>(null);
  const onSave = () => {
    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
  };

  return (
    <TabsProvider count={3}>
      <AuthBoundary fallback={<Header title="" />}>
        <EditRecipeHeader isEdit={isEdit} onSave={onSave} />
      </AuthBoundary>
      <Screen title="Edit Recipe" maxWidth="md">
        <RecipeForm id={id} ref={formRef} onSubmitted={() => goBack()} />
      </Screen>
    </TabsProvider>
  );
};

export default EditRecipe;
