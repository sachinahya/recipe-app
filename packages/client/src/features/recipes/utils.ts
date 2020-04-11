import { stringToHslColor } from '@sachinahya/utils';

export const getTotalTime = (prepTime?: number | null, cookTime?: number | null): number => {
  return (prepTime || 0) + (cookTime || 0);
};

export const getPlaceholderBackground = (recipeTitle: string) =>
  stringToHslColor(recipeTitle, 45, 75);
