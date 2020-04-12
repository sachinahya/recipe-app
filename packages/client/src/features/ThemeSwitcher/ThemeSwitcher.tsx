import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { baseTheme, darkTheme } from 'styles/themes';

const ThemeSwitcher: React.FC = ({ children }) => {
  // const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = false;

  const theme = React.useMemo(() => {
    return createMuiTheme(isDark ? darkTheme : baseTheme);
  }, [isDark]);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeSwitcher;
