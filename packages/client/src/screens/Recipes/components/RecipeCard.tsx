import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { getPlaceholderBackground } from 'features/recipes/utils';
import { FC, MouseEvent } from 'react';
import { onePxGif } from 'styles/utils';

import RecipeCardImage from './RecipeCardImage';
import { RecipesQuery } from './RecipeList.gql';

export type RecipeCardVariant = 'card' | 'list';

interface RecipeCardProps {
  recipe: RecipesQuery['recipes'][0];
  variant: RecipeCardVariant;
  onClick?(evt: MouseEvent<HTMLButtonElement>): void;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, variant, onClick }) => {
  const recipeImage = recipe.images?.[0]?.url;

  return (
    <Card>
      <CardActionArea
        className={variant}
        onClick={onClick}
        css={variant === 'list' && { display: 'flex', alignItems: 'stretch' }}
      >
        <RecipeCardImage
          variant={variant}
          image={recipeImage || onePxGif}
          title={recipe.title}
          style={{ backgroundColor: getPlaceholderBackground(recipe.title) }}
        />
        <CardContent css={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2">
            {recipe.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {recipe.categories.map(cat => cat.name).join(', ')}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            gutterBottom
            css={{
              maxHeight: 'calc(0.875rem * 1.43 * 2)',
              overflow: 'hidden',
              position: 'relative',

              '&::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: 'calc(0.875rem * 1.43)',
                height: 'calc(0.875rem * 1.43)',
                width: '3rem',
                backgroundImage: 'linear-gradient(to right, transparent, white)',
              },
            }}
          >
            {recipe.description}
          </Typography>
          {recipe.totalTime > 0 ? (
            <Typography color="textSecondary" variant="caption">
              {recipe.totalTime} minutes
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
