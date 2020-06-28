import EditIcon from '@material-ui/icons/Edit';
import { Header, HeaderAction } from 'components/Layout';
import RecipeTabs from 'features/recipes/components/RecipeTabs';
import useOnlineStatus from 'lib/useOnlineStatus';
import React from 'react';

import { useRecipeQuery } from './RecipeSingle/RecipeSingle.gql';

interface RecipeHeaderProps {
  id: number;
  defaultTitle: string;
  onEdit?(): void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ id, defaultTitle, onEdit }) => {
  const { data } = useRecipeQuery({ variables: { id } });
  const isOnline = useOnlineStatus();

  const title = data?.recipe?.title || defaultTitle;
  const showEditButton = data?.recipe && onEdit && isOnline;

  return (
    <Header
      title={title}
      variant="back"
      actions={
        showEditButton ? (
          <HeaderAction icon={<EditIcon />} onClick={onEdit} aria-label="Edit" />
        ) : null
      }
      tabs={<RecipeTabs />}
    />
  );
};

export default RecipeHeader;
