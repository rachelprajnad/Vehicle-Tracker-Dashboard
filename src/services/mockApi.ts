import type { Telemetry, Vehicle } from '../types/vehicle';

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: 'Toyota Avanza',
    status: 'ACTIVE',
    speed: 60,
    updated_at: '2025-01-23T10:00:00Z',
  },
  {
    id: 2,
    name: 'Honda CR-V',
    status: 'INACTIVE',
    speed: 0,
    updated_at: '2025-01-23T09:30:00Z',
  },
  {
    id: 3,
    name: 'Mitsubishi Xpander',
    status: 'ACTIVE',
    speed: 85,
    updated_at: '2025-01-23T10:15:00Z',
  },
  {
    id: 4,
    name: 'Suzuki Ertiga',
    status: 'MAINTENANCE',
    speed: 0,
    updated_at: '2025-01-22T14:00:00Z',
  },
  {
    id: 5,
    name: 'Daihatsu Terios',
    status: 'ACTIVE',
    speed: 45,
    updated_at: '2025-01-23T10:45:00Z',
  },
  {
    id: 6,
    name: 'Nissan Grand Livina',
    status: 'INACTIVE',
    speed: 0,
    updated_at: '2025-01-23T08:20:00Z',
  },
];

const mockTelemetryData: { [key: number]: Telemetry } = {
  1: {
    vehicleId: 1,
    odometer: 123456.78,
    fuel_level: 70.2,
    timestamp: '2025-01-23T10:00:00Z',
    latitude: -6.12,
    longitude: 106.85,
    speed: 60,
  },
  2: {
    vehicleId: 2,
    odometer: 200123.45,
    fuel_level: 20.0,
    timestamp: '2025-01-23T09:30:00Z',
    latitude: -6.2,
    longitude: 106.8,
    speed: 0,
  },
  3: {
    vehicleId: 3,
    odometer: 56789.12,
    fuel_level: 95.5,
    timestamp: '2025-01-23T10:15:00Z',
    latitude: -6.3,
    longitude: 106.9,
    speed: 85,
  },
  4: {
    vehicleId: 4,
    odometer: 300000.0,
    fuel_level: 50.0,
    timestamp: '2025-01-22T14:00:00Z',
    latitude: -6.15,
    longitude: 106.88,
    speed: 0,
  },
  5: {
    vehicleId: 5,
    odometer: 89234.56,
    fuel_level: 85.3,
    timestamp: '2025-01-23T10:45:00Z',
    latitude: -6.25,
    longitude: 106.75,
    speed: 45,
  },
  6: {
    vehicleId: 6,
    odometer: 167890.12,
    fuel_level: 15.7,
    timestamp: '2025-01-23T08:20:00Z',
    latitude: -6.18,
    longitude: 106.92,
    speed: 0,
  },
};

export const mockApi = {
  getVehicles: (): Promise<Vehicle[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional API failure
        if (Math.random() < 0.05) {
          reject(new Error('Network connection failed'));
          return;
        }
        resolve(mockVehicles);
      }, 800);
    });
  },

  getVehicleTelemetry: (id: number): Promise<Telemetry> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional API failure
        if (Math.random() < 0.05) {
          reject(new Error('Failed to fetch telemetry data'));
          return;
        }

        if (mockTelemetryData[id]) {
          resolve(mockTelemetryData[id]);
        } else {
          reject(new Error('Vehicle telemetry not found'));
        }
      }, 1000);
    });
  },
};
