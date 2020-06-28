import React from 'react';

export interface ErrorBoundaryInfo {
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
}
