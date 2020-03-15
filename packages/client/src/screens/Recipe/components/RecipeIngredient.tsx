import { Ingredient } from 'features/graphql/types.generated';
import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

type RecipeIngredientProps = Omit<Ingredient, 'id' | 'group' | '__typename'>;

const RecipeIngredient: React.FC<RecipeIngredientProps> = ({
  quantity,
  item,
  measure,
  notes,
  ...props
}) => {
  return (
    <li {...props}>
      {quantity}
      {measure && ' ' + measure} {item} {notes && <span>{' ' + notes}</span>}
    </li>
  );
};

export default styled(RecipeIngredient)`
  list-style: none;
  display: flex;

  &::before {
    content: '\\2022';
    display: block;
    font-size: 1.5rem;
    line-height: 1.5rem;
    color: ${props => props.theme.palette.primary.main};
    margin-right: ${getSpacing(1)};
  }

  span {
    color: ${props => props.theme.palette.grey[600]};
    font-style: italic;
  }
`;
