"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

class ChunkErrorBoundary extends Component<Props, State> {
  private retryTimeoutId?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a chunk loading error
    const isChunkError = error.message.includes('Loading chunk') || 
                        error.message.includes('ChunkLoadError') ||
                        error.name === 'ChunkLoadError';
    
    return {
      hasError: isChunkError,
      error,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ChunkErrorBoundary caught an error:', error, errorInfo);
    
    // Auto retry for chunk loading errors
    if (this.isChunkError(error)) {
      this.scheduleRetry();
    }
  }

  private isChunkError(error: Error): boolean {
    return error.message.includes('Loading chunk') || 
           error.message.includes('ChunkLoadError') ||
           error.name === 'ChunkLoadError';
  }

  private scheduleRetry = () => {
    const { retryCount } = this.state;
    const maxRetries = 3;
    
    if (retryCount < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 5000); // Exponential backoff, max 5s
      
      this.retryTimeoutId = setTimeout(() => {
        this.setState(prevState => ({
          hasError: false,
          retryCount: prevState.retryCount + 1
        }));
      }, delay);
    }
  };

  private handleRetry = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
    
    this.setState({
      hasError: false,
      retryCount: this.state.retryCount + 1
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  render() {
    if (this.state.hasError) {
      const { retryCount } = this.state;
      const maxRetries = 3;
      
      if (retryCount < maxRetries) {
        // Show retry message
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Đang tải lại trang...
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Có lỗi xảy ra khi tải trang. Đang thử lại lần {retryCount + 1}/{maxRetries}...
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </div>
        );
      } else {
        // Show manual retry options
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Lỗi tải trang
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Không thể tải trang do lỗi mạng. Vui lòng thử lại.
              </p>
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Thử lại
                </button>
                <button
                  onClick={this.handleReload}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Tải lại trang
                </button>
              </div>
            </div>
          </div>
        );
      }
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;
