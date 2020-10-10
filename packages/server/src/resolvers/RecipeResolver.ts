import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';

import Recipe from '../entities/Recipe';
import SignedUploadRequest from '../entities/SignedUploadRequest';
import CloudImageService from '../services/CloudImageService';
import RecipeService from '../services/RecipeService';
import RecipeInput from './inputTypes/RecipeInput';
import { ResolverContext } from './types';

@Resolver(of => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  constructor(private recipeService: RecipeService, private imageService: CloudImageService) {}

  @Query(returns => Recipe, { nullable: true })
  @Authorized()
  recipe(@Arg('id') id: number, @Ctx() context: ResolverContext): Promise<Recipe | undefined> {
    return this.recipeService.getById(id, context.user.id);
  }

  @Query(returns => [Recipe])
  @Authorized()
  recipes(@Ctx() context: ResolverContext): Promise<Recipe[]> {
    return this.recipeService.getAllByAuthor(context.user.id);
  }

  @Mutation(returns => Recipe)
  @Authorized()
  addRecipe(@Arg('data') data: RecipeInput, @Ctx() context: ResolverContext): Promise<Recipe> {
    return this.recipeService.save({ ...data, author: context.user });
  }

  @Mutation(returns => SignedUploadRequest)
  async requestUpload(@Arg('mimeType') mimeType: string): Promise<SignedUploadRequest> {
    return this.imageService.requestUpload(mimeType);
  }

  @FieldResolver()
  async images(@Root() recipe: Recipe) {
    const images = await recipe.images;
    if (images) {
      return images.map(img => this.imageService.resolveUrl(img));
    }
  }
}
