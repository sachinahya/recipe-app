import React from 'react';
import BlankScreen from 'screens/BlankScreen';
const Recipes = React.lazy(() => import('./Recipes'));

const RecipesSuspense: React.FC = () => (
  <React.Suspense fallback={<BlankScreen />}>
    <Recipes />
  </React.Suspense>
);

export default RecipesSuspense;
