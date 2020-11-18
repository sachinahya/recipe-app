import { ErrorInfo } from 'react';

export interface ErrorBoundaryInfo {
  error?: Error | null;
  errorInfo?: ErrorInfo | null;
}
