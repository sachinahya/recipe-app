import { Ingredient } from 'features/types.gql';
import { FC } from 'react';
import { getSpacing } from 'styles/styleSelectors';

type RecipeIngredientProps = Omit<Ingredient, 'id' | 'group' | '__typename'>;

const RecipeIngredient: FC<RecipeIngredientProps> = ({
  quantity,
  item,
  measure,
  notes,
  ...props
}) => {
  return (
    <li
      css={theme => ({
        listStyle: 'none',
        display: 'flex',
        marginBottom: getSpacing(2)(theme),

        '&::before': {
          content: '\\2022',
          display: 'block',
          fontSize: '1.5rem',
          lineHeight: '1.5rem',
          color: theme.palette.primary.main,
          marginRight: getSpacing(1)(theme),
        },
      })}
      {...props}
    >
      {quantity}
      {measure && ` ${measure}`} {item}{' '}
      {notes && (
        <span
          css={theme => ({
            color: theme.palette.grey[600],
            fontStyle: 'italic',
          })}
        >{` ${notes}`}</span>
      )}
    </li>
  );
};

export default RecipeIngredient;
