import { Theme } from '@emotion/react';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

// export type StyleSelector = ({ theme }: StyledProps<Record<string, unknown>>) => string;

const defaultDrawerWidth = 240;

const createSelector = (selector: (props: Theme) => string): StyleSelector => {
  return props => selector('theme' in props ? props.theme : props);
};

export type StyleSelector = (props: Theme | { theme: Theme }) => string;

export const getSpacing = (s: number): StyleSelector =>
  createSelector(theme => `${theme.spacing(s)}px`);

export type SpaceValue = string | number;

const parseSpaceValue = (theme: Theme) => (value: string | number | undefined): string => {
  if (value == null) return '';
  if (typeof value == 'string') return value;
  return value < 0 ? `-${theme.spacing(-value)}px` : `${theme.spacing(value)}px`;
};

export const spacing = (
  m1: SpaceValue,
  m2?: SpaceValue,
  m3?: SpaceValue,
  m4?: SpaceValue
): StyleSelector =>
  createSelector(theme =>
    [m1, m2, m3, m4]
      .map(parseSpaceValue(theme))
      .filter(m => m !== '')
      .join(' ')
  );

export const getDrawerWidth = createSelector(
  theme => `${theme.custom?.drawerWidth || defaultDrawerWidth}px`
);

export const getBorderRadius = createSelector(theme => `${theme.shape.borderRadius}px`);

const breakpointQuery = (direction: 'up' | 'down' | 'only') => (breakpoint: Breakpoint) =>
  createSelector(theme => theme.breakpoints[direction](breakpoint));

export const breakpointDown = breakpointQuery('down');
export const breakpointUp = breakpointQuery('up');

export const mobileUp = breakpointUp('xs');
export const mobileDown = breakpointDown('xs');
export const tabletUp = breakpointUp('sm');
export const desktopUp = breakpointUp('md');

// Simple alias for describing it better.
export const drawerShown = desktopUp;
