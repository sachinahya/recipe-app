import { FunctionInterpolation, Theme } from '@emotion/react';
import { desktopUp, getSpacing, mobileDown, tabletUp } from './styleSelectors';

export const mobileOnlyPadding: FunctionInterpolation<Theme> = theme => ({
  [mobileDown(theme)]: {
    padding: getSpacing(2)(theme),
  },
});

export const containerPadding: FunctionInterpolation<Theme> = theme => ({
  padding: getSpacing(2)(theme),
  [tabletUp(theme)]: {
    padding: getSpacing(3)(theme),
  },
  [desktopUp(theme)]: {
    padding: getSpacing(4)(theme),
  },
});
