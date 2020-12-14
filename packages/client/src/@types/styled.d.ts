import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { CustomThemeOptions } from './themes';

declare module '@material-ui/styles' {
  export interface DefaultTheme extends Theme {
    custom?: CustomThemeOptions;
  }
}
