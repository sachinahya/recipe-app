import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeContextConsumerHook } from '@sachinahya/utils';
import React from 'react';
import { baseTheme, darkTheme } from 'styles/themes';

const ThemeSwitcherContext = React.createContext<Theme | undefined>(undefined);

export const ThemeSwitcherProvider: React.FC = ({ children }) => {
  // const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = false;

  const theme = React.useMemo(() => {
    return createMuiTheme(isDark ? darkTheme : baseTheme);
  }, [isDark]);

  return <ThemeSwitcherContext.Provider value={theme}>{children}</ThemeSwitcherContext.Provider>;
};

export const useThemeSwitcher = makeContextConsumerHook(ThemeSwitcherContext);
