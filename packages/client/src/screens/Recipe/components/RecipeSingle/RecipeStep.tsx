import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface RecipeStepProps {
  index: number;
  text: string;
}

const RecipeStep: React.FC<RecipeStepProps> = ({ index, text, ...props }) => {
  return <li {...props}>{text}</li>;
};

export default styled(RecipeStep)`
  list-style: none;
  display: flex;
  align-items: flex-start;

  &::before {
    counter-increment: steps;
    content: counter(steps);
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    flex: 0 0 1.5rem;
    text-align: center;
    border-radius: 50%;
    background-color: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.contrastText};
    margin-right: ${getSpacing(2)};
  }
`;
