import React from 'react';
import type { Vehicle } from '../../types/vehicle';

interface StatusBadgeProps {
  status: Vehicle['status'];
  className?: string;
}

const statusConfig: Record<Vehicle['status'], { label: string; style: string; icon: string }> = {
  ACTIVE: {
    label: 'Active',
    icon: '🟢',
    style: 'bg-green-100 text-green-800 border border-green-300',
  },
  INACTIVE: {
    label: 'Inactive',
    icon: '🔴',
    style: 'bg-red-100 text-red-800 border border-red-300',
  },
  MAINTENANCE: {
    label: 'Maintenance',
    icon: '⚠️',
    style: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const config = statusConfig[status] ?? {
    label: status,
    icon: '❓',
    style: 'bg-gray-100 text-gray-600 border border-gray-300',
  };

  return (
    <span className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${config.style} ${className}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};
