import { Grid } from '@material-ui/core';
import { ErrorMessage } from 'components/Errors';
import Progress from 'components/Progress';
import gql from 'graphql-tag';
import { FC, MouseEvent } from 'react';

import RecipeCard from './RecipeCard';
import { RecipesQuery, useRecipesQuery } from './RecipeList.gql';

export enum RecipeListLayout {
  Grid,
  List,
}

interface RecipeListProps {
  layout?: RecipeListLayout;
  onClick?(evt: MouseEvent<HTMLButtonElement>, recipe: RecipesQuery['recipes'][0]): void;
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

const RecipeList: FC<RecipeListProps> = ({ layout = RecipeListLayout.Grid, onClick }) => {
  const [{ data, error, fetching }] = useRecipesQuery();

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

  if (fetching) return <Progress />;
  if (error) return <ErrorMessage error={error} />;

  if (data) {
    return (
      <Grid container spacing={3}>
        {data.recipes.map(recipe => (
          <Grid item {...gridProps} key={recipe.id}>
            <RecipeCard
              variant={layout === RecipeListLayout.Grid ? 'card' : 'list'}
              recipe={recipe}
              onClick={evt => onClick?.(evt, recipe)}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return null;
};

export default RecipeList;
