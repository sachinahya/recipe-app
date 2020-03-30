import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { RecipeFieldsFragment } from 'features/recipes/fragments.gql';
import { getPlaceholderBackground, getTotalTime } from 'features/recipes/utils';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { tabletUp } from 'styles/mediaQueries';
import { onePxGif } from 'styles/utils';

interface RecipeCardProps {
  recipe: RecipeFieldsFragment;
  variant: 'card' | 'list';
}

const RecipeCardActionArea = styled(CardActionArea)`
  ${props =>
    props.className?.includes('list') &&
    css`
      display: flex;
      align-items: stretch;
    `}
`;

const RecipeCardImage = styled(CardMedia)`
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

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, variant }) => {
  const totalTime = getTotalTime(recipe.prepTime, recipe.cookTime);
  const { push } = useHistory();

  const recipeImage = recipe.images?.[0]?.url;

  return (
    <Card>
      <RecipeCardActionArea className={variant} onClick={() => push(`recipes/${recipe.id}`)}>
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
          {totalTime > 0 ? (
            <Typography color="textSecondary" variant="caption">
              {totalTime} minutes
            </Typography>
          ) : null}
        </RecipeCardContent>
      </RecipeCardActionArea>
    </Card>
  );
};

export default RecipeCard;
