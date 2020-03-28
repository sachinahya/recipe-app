import { Container as MuiContainer } from '@material-ui/core';
import { useScrollRestoration } from '@sachinahya/hooks';
import { ErrorBoundary } from 'components/Errors';
import { useLayout } from 'components/Layout';
import Clear from 'components/Layout/Clear';
import React from 'react';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { containerPadding } from 'styles/snippets';

export type ScreenBaseProps<T = {}> = RouteComponentProps<T>;

interface ScreenProps {
  title: string;
  disablePadding?: boolean;
  padding?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Screen: React.FC<ScreenProps> = ({ children, title, maxWidth, padding, ...rest }) => {
  const ref = useScrollRestoration('scrollPos', useLocation().key || '', useHistory().action);
  const { bottomNavVisible } = useLayout();

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <MuiContainer component="main" maxWidth={maxWidth} ref={ref} {...rest}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </MuiContainer>
      <Clear footer={bottomNavVisible} />
    </>
  );
};

export default styled(Screen)`
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  ${props => props.padding && containerPadding}
`;
