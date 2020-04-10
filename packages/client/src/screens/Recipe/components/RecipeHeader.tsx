import EditIcon from '@material-ui/icons/Edit';
import { Header, HeaderAction } from 'components/Layout';
import RecipeTabs from 'features/recipes/components/RecipeTabs';
import React from 'react';
import { useRecipeQuery } from './RecipeSingle/RecipeSingle.gql';

interface RecipeHeaderProps {
  id: number;
  onEdit?(): void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ id, onEdit }) => {
  const { data } = useRecipeQuery({ variables: { id } });

  return (
    <Header
      title="Recipe"
      variant="back"
      actions={
        data?.recipe &&
        onEdit && <HeaderAction icon={<EditIcon />} onClick={onEdit} aria-label="Edit" />
      }
      tabs={<RecipeTabs />}
    />
  );
};

export default RecipeHeader;
