import gql from 'graphql-tag';

const RECIPE_INGREDIENT_FRAGMENT = gql`
  fragment IngredientFields on Ingredient {
    id
    quantity
    measure
    item
  }
`;

const RECIPE_STEP_FRAGMENT = gql`
  fragment StepFields on Step {
    id
    description
  }
`;

const RECIPE_IMAGE_FRAGMENT = gql`
  fragment ImageFields on ImageMeta {
    id
    url
    order
  }
`;

const RECIPE_CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    name
  }
`;

const RECIPE_CUISINE_FRAGMENT = gql`
  fragment CuisineFields on Cuisine {
    id
    name
  }
`;

const RECIPE_FRAGMENT = gql`
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

const USER_CATEGORIES_QUERY = gql`
  query UserCategories {
    userCategories {
      ...CategoryFields
    }
  }
`;

const USER_CUISINES_QUERY = gql`
  query UserCuisines {
    userCuisines {
      ...CuisineFields
    }
  }
`;

const RECIPE_SINGLE_QUERY = gql`
  query RecipeSingle($id: Float!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
`;

const RECIPE_LIST_QUERY = gql`
  query RecipeList {
    recipes {
      ...RecipeFields
    }
  }
`;
