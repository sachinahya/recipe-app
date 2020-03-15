import { css } from 'styled-components';
import { desktopUp, tabletUp, mobileDown } from './mediaQueries';
import { getSpacing } from './styleSelectors';

export const screenPadding = {
  mobile: css`
    padding: ${getSpacing(2)};
  `,
  tablet: css`
    padding: ${getSpacing(3)};
  `,
  desktop: css`
    padding: ${getSpacing(4)};
  `,
};

export const mobileOnlyPadding = css`
  ${mobileDown} {
    ${screenPadding.mobile}
  }
`;

export const containerPadding = css`
  ${screenPadding.mobile}

  ${tabletUp} {
    ${screenPadding.tablet}
  }

  ${desktopUp} {
    ${screenPadding.desktop}
  }
`;
