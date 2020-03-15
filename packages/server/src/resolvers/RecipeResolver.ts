import { GraphQLUpload } from 'apollo-server-core';
import { GraphQLScalarType } from 'graphql';
import { FileUpload } from 'graphql-upload';
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
import ImageService from '../services/ImageService';
import RecipeService from '../services/RecipeService';
import RecipeInput from './inputTypes/RecipeInput';
import { ResolverContext } from './types';

@Resolver(of => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  constructor(private recipeService: RecipeService, private imageService: ImageService) {}

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

  @Mutation(returns => String)
  stageImage(
    @Arg('file', type => GraphQLUpload as GraphQLScalarType)
    file: FileUpload
  ): Promise<string> {
    /**
     * This will accept a file as an argument and return something that identifies this file once it
     * has been validated and saved. For example, a string could be an ID or URL which would get
     * saved to the database.
     * https://github.com/MichalLytek/type-graphql/issues/37
     */
    const { mimetype, createReadStream } = file;
    return this.imageService.stageImage({
      mimetype,
      stream: createReadStream(),
    });
  }

  @FieldResolver()
  async images(@Root() recipe: Recipe) {
    const images = await recipe.images;
    if (images) {
      return this.imageService.resolveUrls(images);
    }
  }
}
