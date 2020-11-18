import { Container as MuiContainer } from '@material-ui/core';
import { useScrollRestoration } from '@sachinahya/hooks';
import { ErrorBoundary } from 'components/Errors';
import { useLayout } from 'components/Layout';
import Clear from 'components/Layout/Clear';
import { FC, useEffect } from 'react';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { containerPadding } from 'styles/snippets';

export type ScreenBaseProps<T = unknown> = RouteComponentProps<T>;

interface ScreenProps {
  title: string;
  disablePadding?: boolean;
  padding?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Screen: FC<ScreenProps> = ({ children, title, maxWidth, padding, ...rest }) => {
  const ref = useScrollRestoration<HTMLElement>(
    'scrollPos',
    useLocation().key || '',
    useHistory().action
  );
  const { bottomNavVisible } = useLayout();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <main ref={ref} {...rest}>
        <Container maxWidth={maxWidth}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </main>
      <Clear footer={bottomNavVisible} />
    </>
  );
};
const Container = styled(MuiContainer)`
  padding: 0;
`;

export default styled(Screen)`
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  ${props => props.padding && containerPadding}
`;
