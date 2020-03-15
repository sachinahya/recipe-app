import React from 'react';
import Progress from 'components/Progress';
import styled from 'styled-components';

const ScreenProgress: React.FC = ({ children, ...rest }) => {
  return (
    <div {...rest}>
      <Progress />
    </div>
  );
};

export default styled(ScreenProgress)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
