import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // Also log to console for developer
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl w-full bg-white border rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
            <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-64 bg-gray-50 p-3 rounded">{String(this.state.error)}{this.state.info ? "\n" + (this.state.info.componentStack || JSON.stringify(this.state.info)) : ""}</pre>
            <div className="mt-4 flex gap-2">
              <button onClick={() => window.location.reload()} className="px-3 py-2 bg-orange-600 text-white rounded">Reload</button>
              <button onClick={() => { navigator.clipboard?.writeText(String(this.state.error) + (this.state.info?.componentStack || "")); }} className="px-3 py-2 border rounded">Copy Error</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
