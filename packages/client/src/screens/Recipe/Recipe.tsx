import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import RecipeTabs from 'features/recipes/components/RecipeTabs';
import { useRecipeIdParam } from 'features/recipes/hooks';
import React from 'react';
import LoginScreen from 'screens/LoginScreen';
import { useDeviceSize } from 'styles/hooks';
import RecipeSingle from './components/RecipeSingle/RecipeSingle';

const Recipe: React.FC = () => {
  const id = useRecipeIdParam();
  const tablet = useDeviceSize('tablet');

  /*
  const recipe = data?.recipe;
  const title: string | undefined = recipe?.title || location.state?.recipeTitle;
  const browserTitle = title || (error ? 'Error' : 'Loading...');
  const headerTitle = title || '';

  const onEdit = () => recipe && push(recipe.id + '/edit');
 */

  return (
    <TabsProvider enabled={!tablet}>
      <Header
        title="Recipe"
        variant="back"
        /* actions={  <HeaderAction icon={<EditIcon />} onClick={onEdit} aria-label="Edit" />} */
        tabs={<RecipeTabs />}
      />

      <Screen title="Recipe">
        <AuthBoundary fallback={<LoginScreen />}>
          <RecipeSingle id={id} />
        </AuthBoundary>
      </Screen>
    </TabsProvider>
  );
};

export default Recipe;
