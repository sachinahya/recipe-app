import { CardMedia, CardMediaProps } from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { tabletUp } from 'styles/mediaQueries';

import { RecipeCardVariant } from './RecipeCard';

interface RecipeCardImageProps extends CardMediaProps {
  variant: RecipeCardVariant;
}

const RecipeCardImage: React.FC<RecipeCardImageProps> = ({ variant, ...props }) => {
  return <CardMedia {...props} />;
};

export default styled(RecipeCardImage).attrs({ component: 'img', loading: 'lazy' })`
  ${props =>
    props.variant === 'list'
      ? css`
          height: 8.4rem;
          max-width: 33.3333%;
        `
      : css`
          height: 150px;

          ${tabletUp} {
            height: 200px;
          }
        `}
`;
