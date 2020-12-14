import { FC } from 'react';

const Root: FC = props => (
  <div
    css={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexFlow: 'column',
    }}
    {...props}
  />
);

export default Root;
