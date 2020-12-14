import { Box, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { ErrorMessage } from 'components/Errors';
import IconLabel from 'components/IconLabel';
import { ScreenProgress } from 'components/Screen';
import { TabPanel, TabPanels } from 'components/Tabs';
import { Heading } from 'components/Typography';
import { getPlaceholderBackground } from 'features/recipes/utils';
import gql from 'graphql-tag';
import { FC } from 'react';
import { tabletUp, getSpacing } from 'src/styles/styleSelectors';
import { mobileOnlyPadding } from 'styles/snippets';
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

const RecipeSingle: FC<RecipeSingleProps> = ({ children, id, ...rest }) => {
  const [{ data, fetching, error }] = useRecipeQuery({
    variables: { id },
  });

  if (fetching) return <ScreenProgress />;
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
    <Typography
      component="article"
      css={theme => ({
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',

        [tabletUp(theme)]: {
          display: 'grid',
          overflow: 'visible',
          gridTemplateRows: 'minmax(150px, auto)',
          gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
          gridTemplateAreas: "'meta meta' 'ingredients method'",
          gridGap: '24px 16px',
        },
      })}
      {...rest}
    >
      <TabPanels>
        <TabPanel index={0}>
          <Heading component="h1" variant="h4" css={{ gridArea: 'title' }}>
            {recipe.title}
          </Heading>

          <figure
            css={theme => ({
              gridArea: 'image',
              width: `calc(100% + ${getSpacing(4)(theme)})`,
              height: `calc(100% + ${getSpacing(2)(theme)})`,
              margin: -getSpacing(2)(theme),

              [tabletUp(theme)]: {
                width: '100%',
                height: '100%',
                maxHeight: '35vh',
                margin: 0,
              },
            })}
            style={{ backgroundColor: getPlaceholderBackground(recipe.title) }}
          >
            {recipeImage && (
              <img
                css={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={recipeImageUrl}
                alt={recipeImage?.caption || recipe.title}
              />
            )}
          </figure>

          <div css={{ gridArea: 'description' }}>
            <Typography component="p" variant="body2" gutterBottom>
              {recipe.description}
            </Typography>
          </div>

          <div
            css={theme => ({
              gridArea: 'actions',
              paddingTop: getSpacing(2)(theme),
            })}
          >
            <Typography component="p" variant="body2" color="textSecondary">
              {recipe.totalTime ? (
                <IconLabel icon={<TimerIcon titleAccess="Total time" />}>
                  {recipe.totalTime} minutes
                </IconLabel>
              ) : null}
            </Typography>
          </div>
        </TabPanel>

        <RecipeIngredients index={1} ingredients={recipe.ingredients} recipeYield={recipe.yield} />

        <TabPanel index={2} css={[{ gridArea: 'method' }, mobileOnlyPadding]}>
          <SectionTitle>Steps</SectionTitle>
          <ol css={{ counterReset: 'steps', margin: '1rem 0', padding: 0 }}>
            {recipe.steps.map((step, i) => (
              <RecipeStep key={step.id} index={i} text={step.description} />
            ))}
          </ol>
        </TabPanel>
      </TabPanels>
    </Typography>
  );
};

export default RecipeSingle;
