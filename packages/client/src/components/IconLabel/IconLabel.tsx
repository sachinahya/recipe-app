import React from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface IconLabelProps {
  icon: React.ReactElement;
}

const IconLabel: React.FC<IconLabelProps> = ({
  children,
  icon,

  ...props
}) => {
  return (
    <span {...props}>
      {icon}
      {children}
    </span>
  );
};

export default styled(IconLabel)`
  display: inline-flex;
  margin-right: ${getSpacing(3)};

  svg {
    margin-right: ${getSpacing(1)};
  }
`;
