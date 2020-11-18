import Screen from 'components/Screen';
import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RecipeList, { RecipeListLayout } from './components/RecipeList';
import RecipesHeader from './components/RecipesHeader';
import styled from 'styled-components';
import { getSpacing } from '../../styles/styleSelectors';

const AddButton = styled(Fab)`
  position: fixed;
  right: ${getSpacing(4)};
  bottom: ${getSpacing(4)};
  z-index: ${props => props.theme.zIndex.appBar};
`;

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
        <AddButton color="primary" aria-label="Add new recipe">
          <AddIcon />
        </AddButton>
      </Screen>
    </>
  );
};

export default Recipes;
