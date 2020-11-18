import Progress from 'components/Progress';
import { FC } from 'react';
import styled from 'styled-components';

const ScreenProgress: FC = ({ children, ...rest }) => {
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
