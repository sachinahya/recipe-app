import { Typography } from '@material-ui/core';
import { FC } from 'react';

interface ParagraphProps {
  className?: string;
  noGutter?: boolean;
}

const Paragraph: FC<ParagraphProps> = ({ children, className, noGutter }) => (
  <Typography component="p" variant="body2" gutterBottom={!noGutter} className={className}>
    {children}
  </Typography>
);

export default Paragraph;
