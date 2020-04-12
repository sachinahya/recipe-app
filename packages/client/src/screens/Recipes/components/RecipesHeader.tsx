import { MenuItem } from '@material-ui/core';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Header, HeaderAction } from 'components/Layout';
import OverflowMenu from 'components/OverflowMenu';
import React from 'react';

import { useRecipesQuery } from './RecipeList.gql';

interface RecipesHeaderProps {
  title: string;
  isGrid: boolean;
  onLayoutChange?(isGrid: boolean): void;
}

const RecipesHeader: React.FC<RecipesHeaderProps> = ({ title, isGrid, onLayoutChange }) => {
  const { data, refetch } = useRecipesQuery();
  const loaded = !!data;

  const Icon = isGrid ? ViewComfyIcon : ViewListIcon;
  const titleAccess = `Change to ${isGrid ? 'list' : 'grid'} layout`;

  const refresh = () => refetch().catch(console.error);

  return (
    <Header
      title={title}
      actions={
        loaded ? (
          <>
            <HeaderAction
              icon={<Icon />}
              onClick={() => onLayoutChange?.(!isGrid)}
              aria-label={titleAccess}
            />
            <OverflowMenu>
              <MenuItem onClick={refresh}>Refresh</MenuItem>
            </OverflowMenu>
          </>
        ) : null
      }
    />
  );
};

export default RecipesHeader;
