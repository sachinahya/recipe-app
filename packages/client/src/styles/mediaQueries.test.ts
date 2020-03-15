import { combineMedia } from './mediaQueries';

const landscape = '@media (orientation: landscape)';
const minWidth = '@media (min-width: 600px)';

it('concats two queries', () => {
  expect(combineMedia(landscape, minWidth)({} as any)).toEqual(
    '@media (orientation: landscape) and (min-width: 600px)'
  );
});
