export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
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

export type ImageInput = {
  caption?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
};

export type ImageMeta = {
  __typename?: 'ImageMeta';
  caption?: Maybe<Scalars['String']>;
  creationDate: Scalars['DateTime'];
  id: Scalars['String'];
  modifiedDate: Scalars['DateTime'];
  order: Scalars['Int'];
  url: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  group?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  item: Scalars['String'];
  measure?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
};

export type IngredientBase = {
  __typename?: 'IngredientBase';
  group?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  item: Scalars['String'];
  measure?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe: Recipe;
  login: User;
  loginGoogle: User;
  logout: Scalars['Int'];
  register: User;
  requestUpload: SignedUploadRequest;
};

export type MutationAddRecipeArgs = {
  data: RecipeInput;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRegisterArgs = {
  newUser: NewUserInput;
};

export type MutationRequestUploadArgs = {
  mimeType: Scalars['String'];
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
  group?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  item: Scalars['String'];
  measure?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
};

export type NewStepInput = {
  description: Scalars['String'];
  id: Scalars['Int'];
};

export type NewUserInput = {
  email: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
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
  author: User;
  categories: Array<Category>;
  cookTime?: Maybe<Scalars['Float']>;
  creationDate: Scalars['DateTime'];
  cuisines: Array<Cuisine>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  images?: Maybe<Array<ImageMeta>>;
  /** @deprecated Only used for imported recipes. Use "images" instead. */
  imageUrl?: Maybe<Scalars['String']>;
  ingredients: Array<Ingredient>;
  modifiedDate: Scalars['DateTime'];
  prepTime?: Maybe<Scalars['Float']>;
  sourceUrl?: Maybe<Scalars['String']>;
  steps: Array<Step>;
  title: Scalars['String'];
  totalTime: Scalars['Float'];
  yield?: Maybe<Scalars['Float']>;
};

export type RecipeInput = {
  categories?: Maybe<Array<NewCategoryInput>>;
  cookTime?: Maybe<Scalars['Int']>;
  cuisines?: Maybe<Array<NewCuisineInput>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  images?: Maybe<Array<ImageInput>>;
  imageUrl?: Maybe<Scalars['String']>;
  ingredients?: Maybe<Array<NewIngredientInput>>;
  prepTime?: Maybe<Scalars['Int']>;
  sourceUrl?: Maybe<Scalars['String']>;
  stagedImages?: Maybe<Array<StagedImage>>;
  steps?: Maybe<Array<NewStepInput>>;
  title: Scalars['String'];
  yield?: Maybe<Scalars['Int']>;
};

export type SignedUploadRequest = {
  __typename?: 'SignedUploadRequest';
  expires: Scalars['Float'];
  filename: Scalars['String'];
  signedUrl: Scalars['String'];
};

export type StagedImage = {
  id: Scalars['String'];
  order: Scalars['Int'];
};

export type Step = {
  __typename?: 'Step';
  description: Scalars['String'];
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
};
