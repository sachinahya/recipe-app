import Screen, { ScreenProgress } from 'components/Screen';
import { TabsProvider } from 'components/Tabs';
import { useRecipeIdParam } from 'features/recipes/hooks';
import { FC,lazy, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TitleLocationState } from 'routes/types';
import { useDeviceSize } from 'styles/hooks';

import RecipeHeader from './components/RecipeHeader';

const RecipeSingle = lazy(() => import('./components/RecipeSingle'));

const Recipe: FC = () => {
  const { push } = useHistory();
  const { state } = useLocation<TitleLocationState>();
  const id = useRecipeIdParam();
  const tablet = useDeviceSize('tablet');

  const title = state?.title || 'Recipe';

  return (
    <TabsProvider enabled={!tablet} count={3}>
      <RecipeHeader id={id} defaultTitle={title} onEdit={() => push(`${id}/edit`)} />
      <Screen title={title}>
        <Suspense fallback={<ScreenProgress />}>
          <RecipeSingle id={id} />
        </Suspense>
      </Screen>
    </TabsProvider>
  );
};

export default Recipe;
