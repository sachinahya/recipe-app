import { FC,lazy, Suspense } from 'react';
import BlankScreen from 'screens/BlankScreen';
const EditRecipe = lazy(() => import('./EditRecipe'));

const EditRecipeSuspense: FC = () => (
  <Suspense fallback={<BlankScreen />}>
    <EditRecipe />
  </Suspense>
);

export default EditRecipeSuspense;
