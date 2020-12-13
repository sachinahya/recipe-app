import { SaveRecipeMutation } from 'src/features/recipes/components/RecipeForm/RecipeForm.gql';
import { RecipesDocument, RecipesQuery } from 'src/screens/Recipes/components/RecipeList.gql';
import { FieldUpdateResolver } from './types';

export const addRecipeUpdate: FieldUpdateResolver<'addRecipe'> = {
  addRecipe: (result, args, cache) => {
    cache.updateQuery({ query: RecipesDocument }, (data: RecipesQuery | null) => {
      data?.recipes.push((result as SaveRecipeMutation).addRecipe);
      return data;
    });
  },
};
