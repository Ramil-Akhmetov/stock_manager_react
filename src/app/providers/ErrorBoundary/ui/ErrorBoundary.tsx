import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { ErrorPage } from '@/pages/ErrorPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback ui.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback ui
      return (
        <Suspense fallback="">
          <ErrorPage
            message="Произошла непредвиденная ошибка"
            statusCode="500"
            reloadButton
          />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
