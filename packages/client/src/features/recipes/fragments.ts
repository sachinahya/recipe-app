import { gql } from '@apollo/client';

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
    caption
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
    totalTime
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
