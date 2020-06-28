import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { StyleSelector } from './styleSelectors';

const makeMediaQueryCombinator = (separator: string) => (
  ...queries: (string | StyleSelector)[]
): StyleSelector => props => {
  const result = queries
    .map(query => {
      query = typeof query == 'string' ? query : query(props);
      return query.replace(/@media/, '').trim();
    })
    .join(` ${separator} `);
  return `@media ${result}`;
};

export const combineMedia = makeMediaQueryCombinator('and');
export const combineMediaOr = makeMediaQueryCombinator('or');

export const landscape = '@media (orientation: landscape)';

const breakpointQuery = (direction: 'up' | 'down' | 'only') => (
  breakpoint: Breakpoint
): StyleSelector => ({ theme }): string => {
  return theme.breakpoints[direction](breakpoint);
};
const breakpointDown = breakpointQuery('down');
const breakpointUp = breakpointQuery('up');

export const mobileUp = breakpointUp('xs');
export const mobileDown = breakpointDown('xs');
export const tabletUp = breakpointUp('sm');
export const desktopUp = breakpointUp('md');

// Simple alias for describing it better.
export const drawerShown = desktopUp;
