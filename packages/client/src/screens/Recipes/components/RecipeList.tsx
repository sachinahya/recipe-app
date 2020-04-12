import { Grid } from '@material-ui/core';
import { ErrorMessage } from 'components/Errors';
import Progress from 'components/Progress';
import gql from 'graphql-tag';
import React from 'react';

import RecipeCard from './RecipeCard';
import { useRecipesQuery } from './RecipeList.gql';

export enum RecipeListLayout {
  Grid,
  List,
}

interface RecipeListProps {
  layout?: RecipeListLayout;
  onClick?(evt: React.MouseEvent<HTMLButtonElement>, recipeId: number): void;
}

gql`
  query recipes {
    recipes {
      id
      title
      description
      totalTime
      images {
        url
      }
      categories {
        name
      }
    }
  }
`;

const RecipeList: React.FC<RecipeListProps> = ({ layout = RecipeListLayout.Grid, onClick }) => {
  const { data, error, loading } = useRecipesQuery();

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

  if (loading) return <Progress />;
  if (error) return <ErrorMessage error={error} />;

  if (data) {
    return (
      <Grid container spacing={3}>
        {data.recipes.map(recipe => (
          <Grid item {...gridProps} key={recipe.id}>
            <RecipeCard
              variant={layout === RecipeListLayout.Grid ? 'card' : 'list'}
              recipe={recipe}
              onClick={evt => onClick?.(evt, recipe.id)}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return null;
};

export default RecipeList;
