import '@material-ui/core/styles/createMuiTheme';

export interface CustomThemeOptions {
  drawerWidth: number;
  logo?: string;
  logoAltText?: string;
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

/* declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    singleLineText: CSSProperties;
  }

  interface MixinsOptions {
    singleLineText: CSSProperties;
  }
} */
