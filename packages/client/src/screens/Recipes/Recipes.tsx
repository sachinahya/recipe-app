import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Screen from 'components/Screen';
import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getSpacing } from '../../styles/styleSelectors';
import RecipeList, { RecipeListLayout } from './components/RecipeList';
import RecipesHeader from './components/RecipesHeader';

const Recipes: FC = () => {
  const { push } = useHistory();
  const [isGrid, setIsGrid] = useState(true);

  return (
    <>
      <RecipesHeader title="Recipes" isGrid={isGrid} onLayoutChange={setIsGrid} />
      <Screen title="Recipes" padding>
        <RecipeList
          layout={RecipeListLayout[isGrid ? 'Grid' : 'List']}
          onClick={(evt, { id, title }) => push(`/recipe/${id}`, { title })}
        />
        <div
          css={theme => ({
            position: 'fixed',
            right: getSpacing(4)(theme),
            bottom: getSpacing(4)(theme),
            zIndex: theme.zIndex.appBar,
          })}
        >
          <Fab color="primary" aria-label="Add new recipe" onClick={() => push('/new')}>
            <AddIcon />
          </Fab>
        </div>
      </Screen>
    </>
  );
};

export default Recipes;
