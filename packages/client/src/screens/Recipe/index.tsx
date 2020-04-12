import React from 'react';
import BlankScreen from 'screens/BlankScreen';
const Recipe = React.lazy(() => import('./Recipe'));

const RecipeSuspense: React.FC = () => (
  <React.Suspense fallback={<BlankScreen />}>
    <Recipe />
  </React.Suspense>
);

export default RecipeSuspense;
