import React from 'react';
import { Typography } from '@material-ui/core';

type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  subheading?: boolean;
  noGutter?: boolean;
  component?: HeadingLevels;
  variant?: HeadingLevels;
}

const Heading: React.FC<HeadingProps> = ({
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
