import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const baseTheme: ThemeOptions = {
  palette: {
    /* background: {
      default: '#fff',
    },*/
    primary: {
      main: '#49CA94', // #5ec79b - 66ecb4
      // contrastText: '#fff',
    },
    secondary: {
      main: '#ca7d49',
    },
  },
  typography: {
    fontFamily:
      '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", ' +
      '"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", ' +
      '"Droid Sans", "Helvetica Neue", sans-serif;',
  },
  /* mixins: {
    singleLineText: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
    },
  }, */
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiButton: {
      color: 'primary',
      variant: 'outlined',
    },
    MuiCircularProgress: {
      size: 80,
      // color: 'secondary',
    },
  },
  custom: {
    drawerWidth: 240,
  },
};

export const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: { ...baseTheme.palette, type: 'dark' },
};
