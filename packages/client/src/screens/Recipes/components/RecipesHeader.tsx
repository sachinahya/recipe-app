import { MenuItem } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Header, HeaderAction } from 'components/Layout';
import OverflowMenu from 'components/OverflowMenu';
import { useCurrentUser, useLogout } from 'features/auth/hooks';
import useOnlineStatus from 'lib/useOnlineStatus';
import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

import { useRecipesQuery } from './RecipeList.gql';

interface RecipesHeaderProps {
  title: string;
  isGrid: boolean;
  onLayoutChange?(isGrid: boolean): void;
}

const RecipesHeader: FC<RecipesHeaderProps> = ({ title, isGrid, onLayoutChange }) => {
  const isOnline = useOnlineStatus();
  const [{ data, fetching }, refetch] = useRecipesQuery();
  const loaded = !!data;

  const ViewIcon = isGrid ? ViewComfyIcon : ViewListIcon;
  const titleAccess = `Change to ${isGrid ? 'list' : 'grid'} layout`;

  const refresh = () => refetch();

  return (
    <Header
      title={title}
      actions={
        <>
          {loaded ? (
            <>
              {onLayoutChange && (
                <HeaderAction
                  icon={<ViewIcon />}
                  onClick={() => onLayoutChange(!isGrid)}
                  aria-label={titleAccess}
                />
              )}
              {isOnline && (
                <HeaderAction
                  icon={fetching ? <RotatingRefreshIcon /> : <RefreshIcon />}
                  onClick={refresh}
                  aria-label="Refresh recipes"
                />
              )}
            </>
          ) : null}
          <RecipesHeaderOverflowMenu />
        </>
      }
    />
  );
};

const RecipesHeaderOverflowMenu: FC = () => {
  const [user] = useCurrentUser();
  const [logout] = useLogout();

  return user ? (
    <OverflowMenu>
      <MenuItem onClick={logout}>Sign out</MenuItem>
    </OverflowMenu>
  ) : null;
};

const rotateAnim = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RotatingRefreshIcon = styled(RefreshIcon)`
  animation: ${rotateAnim} 2s linear infinite;
`;

export default RecipesHeader;
