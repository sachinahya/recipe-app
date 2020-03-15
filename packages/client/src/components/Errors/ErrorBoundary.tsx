import React from 'react';
import { ErrorBoundaryInfo } from './ErrorBoundary.types';
import ErrorMessage from './ErrorMessage';

interface ErrorBoundaryProps {
  friendlyMessage?: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryInfo
> {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorMessage
          friendlyMessage={this.props.friendlyMessage}
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
