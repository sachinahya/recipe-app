import logger from '@sachinahya/logger';
import { Inject, Service } from 'typedi';

import { createTimer } from '../helpers/performance';
import NewUserInput from '../resolvers/inputTypes/NewUserInput';
import RecipeService from '../services/RecipeService';
import UserService from '../services/UserService';
import { importRecipes } from './importRecipes';

@Service()
export default class RecipeImport {
  @Inject() private recipeService: RecipeService;
  @Inject() private userService: UserService;

  async createRecipes(): Promise<void> {
    try {
      const endTimer = createTimer();

      const userInput1 = new NewUserInput();
      userInput1.email = 'user1@email.com';
      userInput1.plainTextPassword = 'password';

      const userInput2 = new NewUserInput();
      userInput2.email = 'user2@email.com';
      userInput2.plainTextPassword = 'password';

      const [user1] = await Promise.all([
        this.userService.create(userInput1),
        this.userService.create(userInput2),
      ]);

      const recipes = await importRecipes(user1, user1);
      const result = await this.recipeService.importRecipes(recipes);

      endTimer(ms => `Imported ${result.length} recipes in ${ms} ms.`);
    } catch (err) {
      logger.error(err);
    }
  }
}
