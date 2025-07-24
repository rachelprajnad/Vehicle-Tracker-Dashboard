import { BarChart3, Car, Map, Settings } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navigationItems = [
  { icon: Car, label: 'Vehicles', path: '/' },
  { icon: Map, label: 'Map', path: '/map' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2 shadow"></div>;
};
