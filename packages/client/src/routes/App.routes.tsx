import AddIcon from '@material-ui/icons/Add';
import StarIcon from '@material-ui/icons/Star';
import { NavigationLink } from 'components/Navigation';
import { AnimatedRouter } from 'components/Router';
import React from 'react';
import { Route } from 'react-router-dom';
import RegisterScreen from 'screens/RegisterScreen';
import EditRecipe from 'screens/EditRecipe/EditRecipe';
import NotFound from 'screens/NotFound';
import Recipe from 'screens/Recipe/Recipe';
import Recipes from 'screens/Recipes/Recipes';

const AppRoutes: React.FC = () => (
  <AnimatedRouter>
    <Route exact path="/" component={Recipes} />
    <Route exact path="/register" component={RegisterScreen} />
    <Route exact path="/new" component={EditRecipe} />
    <Route exact path="/recipe/:id/edit" component={EditRecipe} />
    <Route exact path="/recipe/:id" component={Recipe} />

    <Route path="*" component={NotFound} />
  </AnimatedRouter>
);

export const routerLinks: NavigationLink[] = [
  { to: '/', text: 'Recipes', icon: StarIcon },
  { to: '/new', text: 'Add Recipe', icon: AddIcon },
];

export default AppRoutes;
