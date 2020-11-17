import Screen from 'components/Screen';
import React from 'react';
import { useHistory } from 'react-router-dom';

import RecipeList, { RecipeListLayout } from './components/RecipeList';
import RecipesHeader from './components/RecipesHeader';

const Recipes: React.FC = () => {
  const { push } = useHistory();
  const [isGrid, setIsGrid] = React.useState(true);

  return (
    <>
      <RecipesHeader title="Recipes" isGrid={isGrid} onLayoutChange={setIsGrid} />
      <Screen title="Recipes" padding>
        <RecipeList
          layout={RecipeListLayout[isGrid ? 'Grid' : 'List']}
          onClick={(evt, { id, title }) => push(`/recipe/${id}`, { title })}
        />
      </Screen>
    </>
  );
};

export default Recipes;
