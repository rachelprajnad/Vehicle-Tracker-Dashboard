// Interface untuk informasi kendaraan
export interface Vehicle {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  speed: number;
  updated_at: string;
}

// Interface untuk data telemetri kendaraan
export interface Telemetry {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

// State kendaraan & telemetri untuk Zustand store
export interface VehicleState {
  vehicles: Vehicle[]; // Daftar semua kendaraan
  telemetry: Telemetry | null; // Data telemetri kendaraan yang dipilih
  loading: boolean; // Status loading
  error: string | null; // Jika error
  fetchVehicles: () => Promise<void>; // Fungsi ambil semua kendaraan
  fetchVehicleTelemetry: (id: number) => Promise<void>; // Fungsi ambil telemetri berdasarkan ID kendaraan
  clearTelemetry: () => void; // Reset data telemetri
  clearError: () => void; // Reset error
}
