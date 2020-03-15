import gql from 'graphql-tag';

const RECIPE_INGREDIENT_FIELDS = gql`
  fragment IngredientFields on Ingredient {
    id
    quantity
    measure
    item
  }
`;

const RECIPE_STEP_FIELDS = gql`
  fragment StepFields on Step {
    id
    description
  }
`;

const RECIPE_IMAGE_FIELDS = gql`
  fragment ImageFields on ImageMeta {
    id
    url
    order
  }
`;

const RECIPE_CATEGORY_FIELDS = gql`
  fragment CategoryFields on Category {
    id
    name
  }
`;

const RECIPE_CUISINE_FIELDS = gql`
  fragment CuisineFields on Cuisine {
    id
    name
  }
`;

const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    title
    description
    sourceUrl
    images {
      ...ImageFields
    }
    prepTime
    cookTime
    yield
    categories {
      ...CategoryFields
    }
    cuisines {
      ...CuisineFields
    }
    ingredients {
      ...IngredientFields
    }
    steps {
      ...StepFields
    }
  }
`;

const ADD_RECIPE_MUTATION = gql`
  mutation AddRecipe($data: RecipeInput!) {
    addRecipe(data: $data) {
      ...RecipeFields
    }
  }
`;

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    stageImage(file: $file)
  }
`;

const USER_CATEGORIES = gql`
  query UserCategories {
    userCategories {
      ...CategoryFields
    }
  }
`;

const USER_CUISINES = gql`
  query UserCuisines {
    userCuisines {
      ...CuisineFields
    }
  }
`;

const RECIPE_SINGLE = gql`
  query RecipeSingle($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
`;

const RECIPE_LIST = gql`
  query RecipeList {
    recipes {
      ...RecipeFields
    }
  }
`;
