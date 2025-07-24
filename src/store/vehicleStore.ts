import { create } from 'zustand';
import { mockApi } from '../services/mockApi';
import type { VehicleState } from '../types/vehicle';

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  telemetry: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await mockApi.getVehicles();
      set({ vehicles: response, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch vehicles', loading: false });
    }
  },

  fetchVehicleTelemetry: async (id: number) => {
    set({ loading: true, error: null, telemetry: null });
    try {
      const response = await mockApi.getVehicleTelemetry(id);
      set({ telemetry: response, loading: false });
    } catch (err: any) {
      set({
        error: err.message || `Failed to fetch telemetry for vehicle ${id}`,
        loading: false,
      });
    }
  },

  clearTelemetry: () => {
    set({ telemetry: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
