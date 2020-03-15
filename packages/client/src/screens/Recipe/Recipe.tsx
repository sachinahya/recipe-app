import EditIcon from '@material-ui/icons/Edit';
import { Header, HeaderAction } from 'components/Layout';
import Screen, { ScreenProgress } from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import { useRecipeIdParam } from 'features/recipes/hooks';
import { useRecipeSingleQuery } from 'features/recipes/queries.generated';
import RecipeTabs from 'features/recipes/RecipeTabs';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ErrorOrLoginScreen from 'screens/ErrorOrLoginScreen';
import { useDeviceSize } from 'styles/hooks';
import RecipeSingle from './components/RecipeSingle';

const Recipe: React.FC = () => {
  const id = useRecipeIdParam(true);
  const { push } = useHistory();
  const location = useLocation<{ recipeTitle: string }>();
  const tablet = useDeviceSize('tablet');

  const { data, error, loading } = useRecipeSingleQuery({
    variables: { id },
  });

  const recipe = data?.recipe;
  const title: string | undefined = recipe?.title || location.state?.recipeTitle;
  const browserTitle = title || (error ? 'Error' : 'Loading...');
  const headerTitle = title || '';

  const onEdit = () => recipe && push(recipe.id + '/edit');

  return (
    <TabsProvider enabled={!tablet}>
      <Header
        title={headerTitle}
        variant="back"
        actions={recipe && <HeaderAction icon={<EditIcon />} onClick={onEdit} aria-label="Edit" />}
        tabs={<RecipeTabs />}
      />

      <Screen title={browserTitle}>
        {loading ? (
          <ScreenProgress />
        ) : error ? (
          <ErrorOrLoginScreen error={error} />
        ) : recipe ? (
          <RecipeSingle recipe={recipe} />
        ) : null}
      </Screen>
    </TabsProvider>
  );
};

export default Recipe;
