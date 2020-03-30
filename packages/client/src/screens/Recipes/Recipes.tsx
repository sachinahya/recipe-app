import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Header } from 'components/Layout';
import Screen, { ScreenBaseProps } from 'components/Screen';
import AuthBoundary from 'features/auth/components/AuthBoundary';
import { useCurrentUser } from 'features/auth/hooks';
import React from 'react';
import LoginScreen from 'screens/LoginScreen';
import RecipeList, { RecipeListLayout } from './components/RecipeList';

const Recipes: React.FC<ScreenBaseProps> = () => {
  const [isGrid, setIsGrid] = React.useState(true);
  const Icon = isGrid ? ViewListIcon : ViewComfyIcon;
  const titleAccess = `Change to ${isGrid ? 'list' : 'grid'} layout`;

  const [user] = useCurrentUser();
  const loggedIn = !!user;

  /*
  const [request, { data, error, refetch }] = useRecipesLazyQuery();
  React.useEffect(() => {
    if (loggedIn) request();
  }, [loggedIn, request]); */

  /* const refresh = () => refetch().catch(console.error);
   */

  return (
    <>
      <Header
        title={loggedIn ? 'Recipes' : ''}
        /* actions={
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
        } */
      />
      <Screen title={'Recipe App'} padding>
        <AuthBoundary fallback={<LoginScreen />}>
          <RecipeList layout={RecipeListLayout['Grid']} />
        </AuthBoundary>
      </Screen>
    </>
  );
};

export default Recipes;
