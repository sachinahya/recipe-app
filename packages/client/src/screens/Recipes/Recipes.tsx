import { MenuItem } from '@material-ui/core';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import { ErrorMessage } from 'components/Errors';
import { Header, HeaderAction } from 'components/Layout';
import OverflowMenu from 'components/OverflowMenu';
import Screen, { ScreenBaseProps, ScreenProgress } from 'components/Screen';
import { useAuth } from 'features/auth';
import gql from 'graphql-tag';
import React from 'react';
import LoginScreen from '../AuthScreens/LoginScreen';
import RecipeList, { RecipeListLayout } from './components/RecipeList';
import { useRecipesLazyQuery } from './Recipes.gql';

const RECIPES_QUERY = gql`
  query recipes {
    recipes {
      ...RecipeFields
    }
  }
`;

const Recipes: React.FC<ScreenBaseProps> = () => {
  const [isGrid, setIsGrid] = React.useState(true);
  const { user } = useAuth();
  const loggedIn = !!user;

  const [request, { data, error, refetch }] = useRecipesLazyQuery();
  React.useEffect(() => {
    if (loggedIn) request();
  }, [loggedIn, request]);

  const refresh = () => refetch().catch(console.error);
  const Icon = isGrid ? ViewListIcon : ViewComfyIcon;
  const titleAccess = `Change to ${isGrid ? 'list' : 'grid'} layout`;

  return (
    <>
      <Header
        title={loggedIn ? 'Recipes' : ''}
        actions={
          data && (
            <>
              <HeaderAction
                icon={<Icon />}
                onClick={() => setIsGrid(!isGrid)}
                aria-label={titleAccess}
              />
              <OverflowMenu>
                <MenuItem onClick={refresh}>Refresh</MenuItem>
              </OverflowMenu>
            </>
          )
        }
      />
      <Screen title={loggedIn ? 'Recipes' : 'Recipe App'} padding>
        {user ? (
          <>
            {error ? (
              <ErrorMessage error={error} />
            ) : data ? (
              <RecipeList
                recipes={data.recipes}
                layout={RecipeListLayout[isGrid ? 'Grid' : 'List']}
              />
            ) : (
              <ScreenProgress />
            )}
          </>
        ) : (
          <LoginScreen />
        )}
      </Screen>
    </>
  );
};

export default Recipes;
