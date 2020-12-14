import { Container as MuiContainer } from '@material-ui/core';
import { useScrollRestoration } from '@sachinahya/hooks';
import { ErrorBoundary } from 'components/Errors';
import { useLayout } from 'components/Layout';
import Clear from 'components/Layout/Clear';
import { FC, useEffect } from 'react';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
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
      <main
        css={{
          padding: 0,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          ...(padding ? containerPadding : undefined),
        }}
        ref={ref}
        {...rest}
      >
        <MuiContainer css={{ padding: 0 }} maxWidth={maxWidth}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </MuiContainer>
      </main>
      <Clear footer={bottomNavVisible} />
    </>
  );
};

export default Screen;
