import { Service } from 'typedi';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import ImageMeta from '../entities/ImageMeta';
import Recipe from '../entities/Recipe';
import CategoryRepository from '../repositories/CategoryRepository';
import CuisineRepository from '../repositories/CuisineRepository';
import RecipeInput from '../resolvers/inputTypes/RecipeInput';
import CloudImageService from './CloudImageService';

interface GetRecipesOptions {
  categories?: string[];
  cuisines?: string[];
}

@Service()
export default class RecipeService {
  constructor(
    private imageService: CloudImageService,
    @InjectRepository(ImageMeta) private imageRepository: Repository<ImageMeta>,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository() private categoryRepository: CategoryRepository,
    @InjectRepository() private cuisineRepository: CuisineRepository
  ) {}

  async getById(id: number, authorId?: number): Promise<Recipe | undefined> {
    const findOptions: FindOneOptions<Recipe> = {
      relations: ['author', 'ingredients', 'steps', 'images'],
    };

    if (authorId != null) {
      findOptions.where = {
        author: { id: authorId },
      };
    }

    return this.recipeRepository.findOne(id, findOptions);
  }

  async getAllByAuthor(authorId: number): Promise<Recipe[]> {
    return this.recipeRepository.find({ where: { author: { id: authorId } } });
  }

  getRecipes(/* { categories, cuisines }: GetRecipesOptions = {} */): Promise<Recipe[]> {
    throw new Error('Not implemented');
  }

  async save(recipeInput: RecipeInput): Promise<Recipe>;
  async save(recipeInput: RecipeInput[]): Promise<Recipe[]>;
  async save(recipeInput: RecipeInput | RecipeInput[]): Promise<Recipe | Recipe[]> {
    recipeInput = Array.isArray(recipeInput) ? recipeInput : [recipeInput];

    const recipesToSave: Recipe[] = [];
    for (const input of recipeInput) {
      let recipe = this.recipeRepository.create(input);
      recipe = await this.getSubEntities(recipe);
      recipesToSave.push(recipe);
    }

    const result = await this.recipeRepository.save(recipesToSave);
    return result.length === 1 ? result[0] : result;
  }

  async importRecipes(recipes: Recipe[]): Promise<Recipe[]> {
    const recipesToSave: Recipe[] = [];

    for (const input of recipes) {
      let recipe = this.recipeRepository.create(input);
      recipe = await this.getSubEntities(recipe);
      recipesToSave.push(recipe);
    }

    return this.recipeRepository.save(recipesToSave);
  }

  private async getSubEntities(recipe: Recipe): Promise<Recipe> {
    const user = await recipe.author;

    const categories = await recipe.categories;
    if (categories) {
      for (const [index, category] of categories.entries()) {
        categories[index] = await this.categoryRepository.saveIfNotExists({ ...category, user }, [
          {
            name: category.name,
            user,
          },
          {
            id: category.id,
            user,
          },
        ]);
      }
    }

    const cuisines = await recipe.cuisines;
    if (cuisines) {
      for (const [index, cuisine] of cuisines.entries()) {
        cuisines[index] = await this.cuisineRepository.saveIfNotExists({ ...cuisine, user }, [
          {
            name: cuisine.name,
            user,
          },
          {
            id: cuisine.id,
            user,
          },
        ]);
      }
    }

    return recipe;
  }
}
