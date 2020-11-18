import AddIcon from '@material-ui/icons/Add';
import StarIcon from '@material-ui/icons/Star';
import { NavigationLink } from 'components/Navigation';
import { AnimatedRouter } from 'components/Router';
import { FC,lazy } from 'react';
import { Route } from 'react-router-dom';
import EditRecipeSuspense from 'screens/EditRecipe';
import RecipeSuspense from 'screens/Recipe';
import RecipesSuspense from 'screens/Recipes';

const NotFound = lazy(() => import('screens/NotFound'));

const AppRoutes: FC = () => (
  <AnimatedRouter>
    <Route exact path="/" component={RecipesSuspense} />
    <Route exact path="/new" component={EditRecipeSuspense} />
    <Route exact path="/recipe/:id/edit" component={EditRecipeSuspense} />
    <Route exact path="/recipe/:id" component={RecipeSuspense} />

    <Route path="*" component={NotFound} />
  </AnimatedRouter>
);

export const routerLinks: NavigationLink[] = [
  { to: '/', text: 'Recipes', icon: StarIcon },
  { to: '/new', text: 'Add Recipe', icon: AddIcon },
];

export default AppRoutes;
