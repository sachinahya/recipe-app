import { CardMedia, CardMediaProps } from '@material-ui/core';
import { FC } from 'react';
import { tabletUp } from 'styles/styleSelectors';
import { RecipeCardVariant } from './RecipeCard';

interface RecipeCardImageProps extends CardMediaProps<'img'> {
  variant: RecipeCardVariant;
}

const RecipeCardImage: FC<RecipeCardImageProps> = ({ variant, ...props }) => {
  return (
    <CardMedia
      component="img"
      loading="lazy"
      {...props}
      css={theme =>
        variant === 'list'
          ? {
              height: '8.4rem',
              maxWidth: '33.3333%',
            }
          : {
              height: 150,
              [tabletUp(theme)]: {
                height: 200,
              },
            }
      }
    />
  );
};

export default RecipeCardImage;
