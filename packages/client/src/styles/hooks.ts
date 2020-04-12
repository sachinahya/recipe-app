import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { desktopUp, tabletUp } from './mediaQueries';

const sizes = {
  tablet: tabletUp,
  desktop: desktopUp,
};

export const useDeviceSize = (size: keyof typeof sizes): boolean => {
  const theme = useTheme();
  return useMediaQuery(sizes[size]({ theme }));
};
