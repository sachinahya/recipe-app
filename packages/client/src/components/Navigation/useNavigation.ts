import { splitPath } from '@sachinahya/utils';
import { useHistory, useLocation } from 'react-router-dom';

const useNavigation = (): {
  currentRoot: string;
  pathLength: number;
  navigate(path: string): void;
} => {
  const history = useHistory();
  const location = useLocation();

  const paths = splitPath(location.pathname);
  const pathLength = paths.length;
  const currentRoot = '/' + (paths[0] || '');
  const navigate = (path: string): void => history.push(path);

  return { currentRoot, pathLength, navigate };
};

export default useNavigation;
