import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

interface IconLabelProps {
  icon: ReactElement;
}

const IconLabel: FC<IconLabelProps> = ({
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
