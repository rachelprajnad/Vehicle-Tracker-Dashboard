import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
}

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const alertIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const alertStyles = {
  success: 'bg-success-50 border-success-200 text-success-800',
  warning: 'bg-warning-50 border-warning-200 text-warning-800',
  error: 'bg-error-50 border-error-200 text-error-800',
  info: 'bg-primary-50 border-primary-200 text-primary-800',
};

const iconStyles = {
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-error-500',
  info: 'text-primary-500',
};

export const AlertSystem: React.FC<AlertSystemProps> = ({ alerts, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const AlertItem: React.FC<{ alert: Alert; onDismiss: (id: string) => void }> = ({ alert, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = alertIcons[alert.type];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    if (alert.duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, alert.duration);

      return () => clearTimeout(timer);
    }
  }, [alert.duration]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(alert.id), 300);
  };

  return (
    <div
      className={`
        ${alertStyles[alert.type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        transform transition-all duration-300 ease-out
        border rounded-lg p-4 shadow-lg backdrop-blur-sm
        animate-slide-up
      `}
    >
      <div className="flex items-start">
        <Icon className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${iconStyles[alert.type]}`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{alert.title}</h4>
          <p className="text-sm mt-1 opacity-90">{alert.message}</p>
        </div>
        <button onClick={handleDismiss} className="ml-3 flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface UseAlertsReturn {
  alerts: Alert[];
  showAlert: (alert: Omit<Alert, 'id'>) => void;
  dismissAlert: (id: string) => void;
  clearAlerts: () => void;
}

export const useAlerts = (): UseAlertsReturn => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (alert: Omit<Alert, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert: Alert = {
      ...alert,
      id,
      duration: alert.duration || 5000,
    };

    setAlerts((prev) => [...prev, newAlert]);
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return {
    alerts,
    showAlert,
    dismissAlert,
    clearAlerts,
  };
};
