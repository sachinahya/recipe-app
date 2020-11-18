import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LayoutProvider } from 'components/Layout';
import React from 'react';
import { baseTheme } from 'styles/themes';

const theme = createMuiTheme(baseTheme);

export const renderWithProviders = (ui: React.ReactElement): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <LayoutProvider>{ui}</LayoutProvider>
    </ThemeProvider>
  );

export { fireEvent, render, userEvent };
