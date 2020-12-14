import { keyframes } from '@emotion/react';
import { MenuItem } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Header, HeaderAction } from 'components/Layout';
import OverflowMenu from 'components/OverflowMenu';
import { useCurrentUser, useLogout } from 'features/auth/hooks';
import useOnlineStatus from 'lib/useOnlineStatus';
import { FC } from 'react';
import { useRecipesQuery } from './RecipeList.gql';

interface RecipesHeaderProps {
  title: string;
  isGrid: boolean;
  onLayoutChange?(isGrid: boolean): void;
}

const rotateAnim = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RecipesHeader: FC<RecipesHeaderProps> = ({ title, isGrid, onLayoutChange }) => {
  const isOnline = useOnlineStatus();
  const [{ data, fetching }, refetch] = useRecipesQuery();
  const loaded = !!data;

  const ViewIcon = isGrid ? ViewComfyIcon : ViewListIcon;
  const titleAccess = `Change to ${isGrid ? 'list' : 'grid'} layout`;

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
                  icon={
                    <RefreshIcon
                      css={fetching && { animation: `${rotateAnim} 2s linear infinite` }}
                    />
                  }
                  onClick={() => refetch({ requestPolicy: 'network-only' })}
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

export default RecipesHeader;
