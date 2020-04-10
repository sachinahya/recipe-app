import Screen, { ScreenBaseProps } from 'components/Screen';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';
import RecipeList, { RecipeListLayout } from './components/RecipeList';
import RecipesHeader from './components/RecipesHeader';

const Recipes: React.FC<ScreenBaseProps> = () => {
  const { push } = useHistory();
  const [isGrid, setIsGrid] = React.useState(true);

  return (
    <>
      <RecipesHeader title="Recipes" isGrid={isGrid} onLayoutChange={setIsGrid} />
      <Screen title="Recipes" padding>
        <AuthBoundary fallback={<LoginScreen />}>
          <RecipeList
            layout={RecipeListLayout[isGrid ? 'Grid' : 'List']}
            onClick={(evt, recipeId) => push('/recipe/' + recipeId)}
          />
        </AuthBoundary>
      </Screen>
    </>
  );
};

export default Recipes;
