import {} from '@emotion/react';
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';

export interface CustomThemeOptions {
  drawerWidth: number;
  logo?: string;
  logoAltText?: string;
}

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    custom: CustomThemeOptions;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: CustomThemeOptions;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom: CustomThemeOptions;
  }
}

declare module '@material-ui/styles' {
  export interface DefaultTheme extends MuiTheme {
    custom?: CustomThemeOptions;
  }
}
