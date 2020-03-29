import React from 'react';
import { Header, HeaderAction } from 'components/Layout';
import RecipeTabs from 'features/recipes/components/RecipeTabs';
import SaveIcon from '@material-ui/icons/Save';

interface EditRecipeHeaderProps {
  isEdit?: boolean;
  onSave?(): void;
}

const EditRecipeHeader: React.FC<EditRecipeHeaderProps> = ({ isEdit, onSave, ...props }) => {
  return (
    <Header
      variant={isEdit ? 'back' : undefined}
      title={isEdit ? 'Edit Recipe' : 'New Recipe'}
      tabs={<RecipeTabs />}
      actions={<HeaderAction icon={<SaveIcon />} disabled={false} onClick={onSave} />}
      {...props}
    />
  );
};

export default EditRecipeHeader;
