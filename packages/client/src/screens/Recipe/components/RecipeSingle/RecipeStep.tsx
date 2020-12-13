import { FC } from 'react';
import { getSpacing } from 'styles/styleSelectors';

interface RecipeStepProps {
  index: number;
  text: string;
}

const RecipeStep: FC<RecipeStepProps> = ({ index, text, ...props }) => {
  return (
    <li
      css={theme => ({
        marginBottom: getSpacing(2)(theme),
        listStyle: 'none',
        display: 'flex',
        alignItems: 'flex-start',

        '&::before': {
          counterIncrement: 'steps',
          content: 'counter(steps)',
          display: 'block',
          height: '1.5rem',
          width: '1.5rem',
          flex: '0 0 1.5rem',
          textAlign: 'center',
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          marginRight: getSpacing(2)(theme),
        },
      })}
      {...props}
    >
      {text}
    </li>
  );
};

export default RecipeStep;
