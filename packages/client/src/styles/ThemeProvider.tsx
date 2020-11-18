import { Theme } from '@material-ui/core/styles';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { FC } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface ThemeProviderProps {
  theme: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ theme, children }) => {
  return (
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StyledThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProvider;
