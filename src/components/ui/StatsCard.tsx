import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

  color?: 'primary' | 'success' | 'warning' | 'error';
  loading?: boolean;
}

const colorClasses = {
  primary: {
    icon: 'text-primary-600 bg-primary-100',
    change: {
      up: 'text-success-600 bg-success-100',
      down: 'text-error-600 bg-error-100',
      neutral: 'text-gray-600 bg-gray-100',
    },
  },
  success: {
    icon: 'text-success-600 bg-success-100',
    change: {
      up: 'text-success-600 bg-success-100',
      down: 'text-error-600 bg-error-100',
      neutral: 'text-gray-600 bg-gray-100',
    },
  },
  warning: {
    icon: 'text-warning-600 bg-warning-100',
    change: {
      up: 'text-success-600 bg-success-100',
      down: 'text-error-600 bg-error-100',
      neutral: 'text-gray-600 bg-gray-100',
    },
  },
  error: {
    icon: 'text-error-600 bg-error-100',
    change: {
      up: 'text-success-600 bg-success-100',
      down: 'text-error-600 bg-error-100',
      neutral: 'text-gray-600 bg-gray-100',
    },
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, color = 'primary', loading = false }) => {
  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:scale-105 transform transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color].change[change.trend]}`}>
              {change.trend === 'up' && '↗'}
              {change.trend === 'down' && '↘'}
              {change.trend === 'neutral' && '→'}
              <span className="ml-1">{change.value}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color].icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
