import { AlertCircle, RefreshCw, X } from 'lucide-react';
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onDismiss, className = '' }) => {
  return (
    <div className={`bg-error-50 border border-error-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-error-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-error-800 font-medium">Error</p>
          <p className="text-sm text-error-700 mt-1">{message}</p>
          {onRetry && (
            <button onClick={onRetry} className="mt-3 inline-flex items-center px-3 py-1.5 text-xs font-medium text-error-700 bg-error-100 border border-error-300 rounded-md hover:bg-error-200 transition-colors duration-200">
              <RefreshCw className="w-3 h-3 mr-1" />
              Try Again
            </button>
          )}
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="ml-3 text-error-400 hover:text-error-600 transition-colors duration-200">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
