import { Car } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Vehicle Tracker Dashboard' }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          {}
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-3 shadow-md">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">{title}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Real-time vehicle monitoring system</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
