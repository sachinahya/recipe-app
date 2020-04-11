import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface ButtonRowProps {
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

const ButtonRow: React.FC<ButtonRowProps> = ({
  children,
  component: Component = 'div',
  ...props
}) => {
  return <Component {...props}>{children}</Component>;
};

export default styled(ButtonRow)`
  button {
    margin-right: ${getSpacing(1)};
  }
`;
