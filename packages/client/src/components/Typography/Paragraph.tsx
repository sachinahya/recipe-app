import React from 'react';
import { Typography } from '@material-ui/core';

interface ParagraphProps {
  className?: string;
  noGutter?: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  noGutter,
}) => (
  <Typography
    component="p"
    variant="body2"
    gutterBottom={!noGutter}
    className={className}
  >
    {children}
  </Typography>
);

export default Paragraph;
