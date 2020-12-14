import { Typography } from '@material-ui/core';
import { FC } from 'react';

import { ErrorBoundaryInfo } from './ErrorBoundary.types';

interface ErrorMessageProps extends ErrorBoundaryInfo {
  friendlyMessage?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error, errorInfo, friendlyMessage }) => {
  const heading = (
    <Typography variant="h3" gutterBottom>
      Something went wrong!
    </Typography>
  );

  if (process.env.NODE_ENV === 'development') {
    return (
      <>
        {heading}
        {friendlyMessage}
        {error && <pre style={{ whiteSpace: 'pre-line' }}>{error.message}</pre>}
        {error && <pre style={{ whiteSpace: 'pre-line' }}>{error.stack}</pre>}
        {errorInfo && <pre style={{ whiteSpace: 'pre-line' }}>{errorInfo.componentStack}</pre>}
      </>
    );
  }

  return (
    <>
      {heading}
      {friendlyMessage}
    </>
  );
};

export default ErrorMessage;
