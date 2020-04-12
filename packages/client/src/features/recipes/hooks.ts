import { invariant } from '@sachinahya/utils';
import { useRouteMatch } from 'react-router-dom';

interface UseRecipeIdParamOptions {
  required?: boolean;
  paramName?: string;
}

export const useRecipeIdParam = ({
  required = true,
  paramName = 'id',
}: UseRecipeIdParamOptions = {}): number => {
  const id = useRouteMatch<any>().params[paramName];
  if (required) invariant(id, 'An ID must be specified.');
  return Number(id);
};
