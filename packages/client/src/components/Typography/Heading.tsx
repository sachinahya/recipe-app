import { Typography } from '@material-ui/core';
import { FC } from 'react';

export type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  subheading?: boolean;
  noGutter?: boolean;
  component?: HeadingLevels;
  variant?: HeadingLevels;
}

const Heading: FC<HeadingProps> = ({
  children,
  component,
  variant,
  subheading,
  noGutter,
  ...props
}) => (
  <Typography variant={variant} gutterBottom={!noGutter} {...props}>
    {children}
  </Typography>
);

export default Heading;
