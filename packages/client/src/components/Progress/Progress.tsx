import { Box, CircularProgress } from '@material-ui/core';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { useTimeout } from '@sachinahya/hooks';
import { FC,useEffect, useState } from 'react';

import { PROGRESS_SHOW_DELAY } from './Progress.constants';

export interface ProgressProps extends CircularProgressProps {
  foo?: string;
}

const Progress: FC<ProgressProps> = props => {
  const [show, setShow] = useState(false);
  const showLoading = useTimeout(() => setShow(true), PROGRESS_SHOW_DELAY);

  useEffect(() => {
    showLoading();
  }, [showLoading]);

  return show ? (
    <Box textAlign="center">
      <CircularProgress {...props} />
    </Box>
  ) : null;
};

export default Progress;
