import React, { FC } from 'react';
import { spacing } from 'src/styles/styleSelectors';

const ImageSelectionCell: FC = props => (
  <div
    css={theme => ({
      display: 'flex',
      flex: `0 1 calc(50% - (2 * ${spacing(1)(theme)}))`,
      height: 150,
      margin: spacing(1)(theme),
    })}
    {...props}
  />
);

export default ImageSelectionCell;
