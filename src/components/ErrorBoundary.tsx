import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center shadow-lg">
            {/* Error Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>

            {/* Error Message */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Don't worry, this has been logged and our team will look into it.
            </p>

            {/* Error Details (Development Mode) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground mb-2">
                  Technical Details
                </summary>
                <div className="bg-muted rounded p-3 text-xs font-mono overflow-auto max-h-40">
                  <p className="text-destructive font-bold mb-1">{this.state.error.name}</p>
                  <p className="text-foreground">{this.state.error.message}</p>
                </div>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white
                         rounded-lg font-semibold hover:bg-brand-blue/90 transition-all
                         focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2
                         shadow-md hover:shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Page
              </button>
              <a
                href="https://www.mycollegefinance.com/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary
                         text-secondary-foreground rounded-lg font-semibold
                         hover:bg-secondary/80 transition-all
                         focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                Return Home
              </a>
            </div>

            {/* MCF Branding */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                My College Finance
              </p>
              <p className="text-[10px] text-muted-foreground tracking-wider mt-1">
                EDUCATE • MOTIVATE • ELEVATE
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
