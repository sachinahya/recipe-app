import { Grid } from '@material-ui/core';
import { DeleteIconButton } from 'components/Button';
import TextField from 'features/forms/TextField';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface IngredientRowProps {
  index: number;
  onDelete?: () => void;
}

const IngredientRow: React.FC<IngredientRowProps> = ({ index, onDelete, ...props }) => {
  return (
    <Grid container spacing={1} {...props}>
      <Grid item className="quantity">
        <TextField fast id={`q${index}`} name={`ingredients[${index}].quantity`} label="Quantity" />
      </Grid>
      <Grid item className="measure">
        <TextField fast id={`m${index}`} name={`ingredients[${index}].measure`} label="Measure" />
      </Grid>
      <Grid item className="item">
        <TextField fast id={`i${index}`} name={`ingredients[${index}].item`} label="Item" />
      </Grid>
      <Grid item className="notes">
        <TextField fast id={`n${index}`} name={`ingredients[${index}].notes`} label="Notes" />
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
