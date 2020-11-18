import { FC, ElementType, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface ButtonRowProps {
  component?: ElementType<HTMLAttributes<HTMLElement>>;
}

const ButtonRow: FC<ButtonRowProps> = ({ children, component: Component = 'div', ...props }) => {
  return <Component {...props}>{children}</Component>;
};

export default styled(ButtonRow)`
  button {
    margin-right: ${getSpacing(1)};
  }
`;
