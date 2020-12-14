import Progress from 'components/Progress';
import { FC } from 'react';

const ScreenProgress: FC = ({ children, ...rest }) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      {...rest}
    >
      <Progress />
    </div>
  );
};

export default ScreenProgress;
