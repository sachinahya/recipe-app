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
