import React from 'react';
import BlankScreen from 'screens/BlankScreen';
const EditRecipe = React.lazy(() => import('./EditRecipe'));

const EditRecipeSuspense: React.FC = () => (
  <React.Suspense fallback={<BlankScreen />}>
    <EditRecipe />
  </React.Suspense>
);

export default EditRecipeSuspense;
