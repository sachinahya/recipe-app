import { Grid } from '@material-ui/core';
import { DeleteIconButton } from 'components/Button';
import TextField from 'features/forms/TextField';
import { FC } from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface IngredientRowProps {
  index: number;
  name: string;
  onDelete?: () => void;
}

const IngredientRow: FC<IngredientRowProps> = ({ index, name, onDelete, ...props }) => {
  return (
    <Grid container spacing={1} {...props}>
      <Grid item className="quantity">
        <TextField fast id={`q-${name}`} name={`${name}.quantity`} label="Quantity" />
      </Grid>
      <Grid item className="measure">
        <TextField fast id={`m-${name}`} name={`${name}.measure`} label="Measure" />
      </Grid>
      <Grid item className="item">
        <TextField fast id={`i-${name}`} name={`${name}.item`} label="Item" />
      </Grid>
      <Grid item className="notes">
        <TextField fast id={`n-${name}`} name={`${name}.notes`} label="Notes" />
      </Grid>
      {onDelete && (
        <Grid item>
          <DeleteIconButton onClick={onDelete} />
        </Grid>
      )}
    </Grid>
  );
};

export default styled(IngredientRow)`
  margin-bottom: ${getSpacing(2)};

  .quantity {
    width: 6rem;
  }

  .measure {
    width: 6rem;
  }

  .item {
    flex-grow: 3;
  }

  .notes {
    flex-grow: 1;
  }
`;
