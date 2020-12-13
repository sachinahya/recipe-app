import { Grid, IconButton, IconButtonProps, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCounter } from '@sachinahya/hooks';
import { pluralize } from '@sachinahya/utils';
import { TabPanel } from 'components/Tabs';
import { Recipe } from 'features/types.gql';
import round from 'lodash/round';
import { FC } from 'react';
import { mobileOnlyPadding } from 'styles/snippets';
import { getSpacing } from 'styles/styleSelectors';
import RecipeIngredient from './RecipeIngredient';
import SectionTitle from './SectionTitle';

interface RecipeIngredientsProps {
  index: number;
  ingredients: Recipe['ingredients'];
  recipeYield: Recipe['yield'];
}

const ServingControl: FC<IconButtonProps> = props => (
  <IconButton
    color="primary"
    size="small"
    css={theme => ({
      marginLeft: getSpacing(1)(theme),
      svg: {
        border: '1px solid currentColor',
        borderRadius: '50%',
      },
    })}
    {...props}
  />
);

const RecipeIngredients: FC<RecipeIngredientsProps> = ({
  index,
  ingredients,
  recipeYield,
  ...props
}) => {
  const [adjustedYield, { increment, decrement }] = useCounter({
    initial: recipeYield || 0,
    min: 1,
  });

  ingredients =
    recipeYield && recipeYield !== adjustedYield
      ? ingredients.map(ing => ({
          ...ing,
          quantity: round((ing.quantity / recipeYield) * adjustedYield, 3),
        }))
      : ingredients;

  return (
    <TabPanel
      index={index}
      css={[
        {
          gridArea: 'ingredients',
        },
        mobileOnlyPadding,
      ]}
      {...props}
    >
      <SectionTitle>Ingredients</SectionTitle>

      <Grid css={theme => ({ marginTop: getSpacing(2)(theme) })} container alignItems="center">
        <Grid item xs>
          <Typography color="textSecondary" variant="subtitle1">
            {`${adjustedYield} ${pluralize(adjustedYield, 'serving')}`}
          </Typography>
        </Grid>
        <Grid item>
          <ServingControl aria-label="Increase servings" onClick={increment}>
            <AddIcon />
          </ServingControl>
          <ServingControl aria-label="Decrease servings" onClick={decrement}>
            <RemoveIcon />
          </ServingControl>
        </Grid>
      </Grid>

      <ul
        css={{
          margin: '1rem 0',
          padding: 0,
        }}
      >
        {ingredients.map((ing, i) => (
          <RecipeIngredient key={i} {...ing} />
        ))}
      </ul>
    </TabPanel>
  );
};

export default RecipeIngredients;
