import { gql } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import ButtonRow from 'components/ButtonRow';
import { ErrorMessage } from 'components/Errors';
import IconLabel from 'components/IconLabel';
import { ScreenProgress } from 'components/Screen';
import { TabPanel, TabPanels } from 'components/Tabs';
import { Heading } from 'components/Typography';
import { getPlaceholderBackground } from 'features/recipes/utils';
import React from 'react';
import styled from 'styled-components';
import { tabletUp } from 'styles/mediaQueries';
import { mobileOnlyPadding } from 'styles/snippets';
import { getSpacing } from 'styles/styleSelectors';

import RecipeIngredients from './RecipeIngredients';
import { useRecipeQuery } from './RecipeSingle.gql';
import RecipeStep from './RecipeStep';
import SectionTitle from './SectionTitle';

export interface RecipeSingleProps {
  id: number;
}

gql`
  query recipe($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
`;

const RecipeSingle: React.FC<RecipeSingleProps> = ({ children, id, ...rest }) => {
  const { data, loading, error } = useRecipeQuery({
    variables: { id },
  });

  if (loading) return <ScreenProgress />;
  if (error)
    return (
      <Box p={3}>
        <ErrorMessage error={error} />
      </Box>
    );

  if (!data || !data.recipe) {
    return null;
  }

  const recipe = data.recipe;
  const recipeImage = recipe.images?.[0];
  const recipeImageUrl = recipeImage?.url;

  return (
    <Typography component="article" {...rest}>
      <TabPanels>
        <RecipeMeta index={0}>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeImage style={{ backgroundColor: getPlaceholderBackground(recipe.title) }}>
            {recipeImage && <img src={recipeImageUrl} alt={recipeImage?.caption || recipe.title} />}
          </RecipeImage>
          <RecipeDescription>
            <Typography component="p" variant="body2" gutterBottom>
              {recipe.description}
            </Typography>
          </RecipeDescription>
          <RecipeActions>
            <Typography component="p" variant="body2" color="textSecondary">
              {recipe.totalTime ? (
                <IconLabel icon={<TimerIcon titleAccess="Total time" />}>
                  {recipe.totalTime} minutes
                </IconLabel>
              ) : null}
            </Typography>
          </RecipeActions>
        </RecipeMeta>

        <RecipeIngredients index={1} ingredients={recipe.ingredients} recipeYield={recipe.yield} />

        <RecipeMethod index={2}>
          <SectionTitle>Steps</SectionTitle>
          <ol>
            {recipe.steps.map((step, i) => (
              <RecipeStep key={step.id} index={i} text={step.description} />
            ))}
          </ol>
        </RecipeMethod>
      </TabPanels>
    </Typography>
  );
};

const RecipeTitle = styled(Heading).attrs({
  component: 'h1',
  variant: 'h4',
})`
  grid-area: title;
`;

const RecipeMeta = styled(TabPanel)`
  grid-area: meta;
  display: grid;
  grid-template-rows: 40vh ${getSpacing(2)};
  grid-template-columns: 1fr;
  grid-template-areas: 'image' '.' 'title' 'description' 'actions';

  p {
    margin-top: 0;
  }

  &[hidden] {
    /* Override display: grid above */
    display: none;
  }

  ${mobileOnlyPadding}

  ${tabletUp} {
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: minmax(calc(300px - ${getSpacing(3)}), 1fr) ${getSpacing(5)} 2fr;
    grid-template-areas: 'image . title' 'image . description' 'image . actions';
  }
`;

const RecipeImage = styled.figure`
  grid-area: image;
  width: calc(100% + ${getSpacing(4)});
  height: calc(100% + ${getSpacing(2)});
  margin: -${getSpacing(2)};

  ${tabletUp} {
    width: 100%;
    height: 100%;
    max-height: 35vh;
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecipeDescription = styled.div`
  grid-area: description;
`;

const RecipeActions = styled(ButtonRow)`
  grid-area: actions;
  padding-top: ${getSpacing(2)};
`;

const RecipeMethod = styled(TabPanel)`
  grid-area: method;
  ${mobileOnlyPadding}

  ol {
    counter-reset: steps;
    margin: 1rem 0;
    padding: 0;
  }

  li {
    margin-bottom: ${getSpacing(2)};
  }
`;

export default styled(RecipeSingle)`
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  ${tabletUp} {
    display: grid;
    overflow: visible;
    grid-template-rows: minmax(150px, auto);
    grid-template-columns: minmax(300px, 1fr) 2fr;
    grid-template-areas: 'meta meta' 'ingredients method';
    grid-gap: 24px 16px;
  }
`;
