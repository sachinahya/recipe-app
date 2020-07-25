export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Cuisine = {
  __typename?: 'Cuisine';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ImageMeta = {
  __typename?: 'ImageMeta';
  id: Scalars['String'];
  url: Scalars['String'];
  creationDate: Scalars['DateTime'];
  modifiedDate: Scalars['DateTime'];
  order?: Maybe<Scalars['Int']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int'];
  quantity: Scalars['Float'];
  item: Scalars['String'];
  measure?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type IngredientBase = {
  __typename?: 'IngredientBase';
  id: Scalars['Int'];
  quantity: Scalars['Float'];
  item: Scalars['String'];
  measure?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  loginGoogle: User;
  logout: Scalars['Int'];
  addRecipe: Recipe;
  stageImage: Scalars['String'];
};

export type MutationRegisterArgs = {
  newUser: NewUserInput;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationAddRecipeArgs = {
  data: RecipeInput;
};

export type MutationStageImageArgs = {
  file: Scalars['Upload'];
};

export type NewCategoryInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type NewCuisineInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type NewIngredientInput = {
  id: Scalars['Int'];
  quantity: Scalars['Float'];
  item: Scalars['String'];
  measure?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type NewStepInput = {
  id: Scalars['Int'];
  description: Scalars['String'];
};

export type NewUserInput = {
  id?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  plainTextPassword: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  userCategories: Array<Category>;
  userCuisines: Array<Cuisine>;
};

export type QueryRecipeArgs = {
  id: Scalars['Float'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  creationDate: Scalars['DateTime'];
  modifiedDate: Scalars['DateTime'];
  author: User;
  categories: Array<Category>;
  cuisines: Array<Cuisine>;
  /** @deprecated Only used for imported recipes. Use "images" instead. */
  imageUrl?: Maybe<Scalars['String']>;
  images?: Maybe<Array<ImageMeta>>;
  prepTime?: Maybe<Scalars['Float']>;
  cookTime?: Maybe<Scalars['Float']>;
  yield?: Maybe<Scalars['Float']>;
  sourceUrl?: Maybe<Scalars['String']>;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
  totalTime: Scalars['Float'];
};

export type RecipeInput = {
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<NewCategoryInput>>;
  cuisines?: Maybe<Array<NewCuisineInput>>;
  imageUrl?: Maybe<Scalars['String']>;
  stagedImages?: Maybe<Array<StagedImage>>;
  prepTime?: Maybe<Scalars['Int']>;
  cookTime?: Maybe<Scalars['Int']>;
  yield?: Maybe<Scalars['Int']>;
  ingredients?: Maybe<Array<NewIngredientInput>>;
  steps?: Maybe<Array<NewStepInput>>;
  sourceUrl?: Maybe<Scalars['String']>;
};

export type StagedImage = {
  id: Scalars['String'];
  order: Scalars['Int'];
};

export type Step = {
  __typename?: 'Step';
  id: Scalars['Int'];
  description: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
};
