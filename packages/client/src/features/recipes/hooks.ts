import { useRouteMatch } from 'react-router-dom';
import { invariant } from '@sachinahya/utils';

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
