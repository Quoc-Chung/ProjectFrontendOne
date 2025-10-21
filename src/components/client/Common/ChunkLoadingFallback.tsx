"use client";

import React, { useState, useEffect } from 'react';

interface ChunkLoadingFallbackProps {
  onRetry?: () => void;
  error?: Error;
}

export default function ChunkLoadingFallback({ onRetry, error }: ChunkLoadingFallbackProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    // Wait a bit before retrying
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior - reload the page
      window.location.reload();
    }
    
    setIsRetrying(false);
  };

  const handleReload = () => {
    window.location.reload();
  };

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
          Đang tải trang...
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          {error ? 'Có lỗi xảy ra khi tải trang.' : 'Vui lòng chờ trong giây lát.'}
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-xs text-red-600">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {isRetrying ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-600">Đang thử lại...</span>
            </div>
          ) : (
            <>
              <button
                onClick={handleRetry}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Thử lại {retryCount > 0 && `(${retryCount})`}
              </button>
              <button
                onClick={handleReload}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Tải lại trang
              </button>
            </>
          )}
        </div>
        
        {retryCount > 0 && (
          <p className="text-xs text-gray-400 mt-4">
            Đã thử {retryCount} lần
          </p>
        )}
      </div>
    </div>
  );
}
