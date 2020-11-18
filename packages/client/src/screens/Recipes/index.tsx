import { FC,lazy, Suspense } from 'react';
import BlankScreen from 'screens/BlankScreen';
const Recipes = lazy(() => import('./Recipes'));

const RecipesSuspense: FC = () => (
  <Suspense fallback={<BlankScreen />}>
    <Recipes />
  </Suspense>
);

export default RecipesSuspense;
