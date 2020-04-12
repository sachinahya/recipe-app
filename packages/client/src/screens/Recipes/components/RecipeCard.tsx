import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { getPlaceholderBackground } from 'features/recipes/utils';
import React from 'react';
import styled, { css } from 'styled-components';
import { tabletUp } from 'styles/mediaQueries';
import { onePxGif } from 'styles/utils';
import { RecipesQuery } from './RecipeList.gql';

interface RecipeCardProps {
  recipe: RecipesQuery['recipes'][0];
  variant: 'card' | 'list';
  onClick?(evt: React.MouseEvent<HTMLButtonElement>): void;
}

const RecipeCardActionArea = styled(CardActionArea)`
  ${props =>
    props.className?.includes('list') &&
    css`
      display: flex;
      align-items: stretch;
    `}
`;

const RecipeCardImage = styled(CardMedia).attrs({ component: 'img', loading: 'lazy' })`
  flex: 0 0 33.33333%;

  ${props =>
    props.className?.includes('card') &&
    css`
      height: 150px;

      ${tabletUp} {
        height: 200px;
      }
    `}
`;

const RecipeCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const RecipeCardDescription = styled(Typography)`
  max-height: calc(0.875rem * 1.43 * 2);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: calc(0.875rem * 1.43);
    height: calc(0.875rem * 1.43);
    width: 3rem;
    background-image: linear-gradient(to right, transparent, white);
  }
`;

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, variant, onClick }) => {
  const recipeImage = recipe.images?.[0]?.url;

  return (
    <Card>
      <RecipeCardActionArea className={variant} onClick={onClick}>
        <RecipeCardImage
          className={variant}
          image={recipeImage || onePxGif}
          title={recipe.title}
          style={{ backgroundColor: getPlaceholderBackground(recipe.title) }}
        />
        <RecipeCardContent>
          <Typography variant="h5" component="h2">
            {recipe.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {recipe.categories.map(cat => cat.name).join(', ')}
          </Typography>
          <RecipeCardDescription color="textSecondary" variant="body2" gutterBottom>
            {recipe.description}
          </RecipeCardDescription>
          {recipe.totalTime > 0 ? (
            <Typography color="textSecondary" variant="caption">
              {recipe.totalTime} minutes
            </Typography>
          ) : null}
        </RecipeCardContent>
      </RecipeCardActionArea>
    </Card>
  );
};

export default RecipeCard;
