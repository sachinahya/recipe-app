import { useRouteMatch } from 'react-router-dom';
import { invariant } from '@sachinahya/utils';

export const useRecipeIdParam = (required?: boolean, paramName: string = 'id'): number => {
  const id = useRouteMatch<any>().params[paramName];
  if (required) invariant(id, 'An ID must be specified.');
  return Number(id);
};
