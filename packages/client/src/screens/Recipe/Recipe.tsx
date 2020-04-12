import Screen from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import { useRecipeIdParam } from 'features/recipes/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';
import { useDeviceSize } from 'styles/hooks';
import RecipeHeader from './components/RecipeHeader';
import RecipeSingle from './components/RecipeSingle';

const Recipe: React.FC = () => {
  const { push } = useHistory();
  const id = useRecipeIdParam();
  const tablet = useDeviceSize('tablet');

  /*
  const recipe = data?.recipe;
  const title: string | undefined = recipe?.title || location.state?.recipeTitle;
  const browserTitle = title || (error ? 'Error' : 'Loading...');
  const headerTitle = title || '';

 */

  return (
    <TabsProvider enabled={!tablet} count={3}>
      <RecipeHeader id={id} onEdit={() => push(id + '/edit')} />
      <Screen title="Recipe">
        <AuthBoundary fallback={<LoginScreen />}>
          <RecipeSingle id={id} />
        </AuthBoundary>
      </Screen>
    </TabsProvider>
  );
};

export default Recipe;
