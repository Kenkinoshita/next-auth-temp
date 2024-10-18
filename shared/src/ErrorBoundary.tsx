import { Component } from 'react';

type Props = {
  children: React.ReactNode;
  fallback: (error: Error) => React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
};
type State = { didCatch: false } | { didCatch: true; error: Error };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { didCatch: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { didCatch: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.didCatch) {
      // You can render any custom fallback UI
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}
