import { Grid } from '@material-ui/core';
import { RecipeFieldsFragment } from 'features/recipes/fragments.gql';
import React from 'react';
import RecipeCard from './RecipeCard';

export enum RecipeListLayout {
  Grid,
  List,
}

interface RecipeListProps {
  recipes: RecipeFieldsFragment[];
  layout?: RecipeListLayout;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, layout = RecipeListLayout.Grid }) => {
  const gridProps =
    layout === RecipeListLayout.Grid
      ? ({
          xs: 12,
          sm: 6,
          md: 4,
        } as const)
      : ({
          xs: 12,
        } as const);

  return (
    <Grid container spacing={3}>
      {recipes.map(recipe => (
        <Grid item {...gridProps} key={recipe.id}>
          <RecipeCard
            variant={layout === RecipeListLayout.Grid ? 'card' : 'list'}
            recipe={recipe}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
