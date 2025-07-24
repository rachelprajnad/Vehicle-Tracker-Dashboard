import { RefreshCw, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { VehicleCard } from '../components/ui/VehicleCard';
import { useVehicleStore } from '../store/vehicleStore';

export const VehicleListPage: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles, clearError } = useVehicleStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleViewDetail = (id: number) => {
    navigate(`/vehicles/${id}`);
  };

  const handleRetry = () => {
    clearError();
    fetchVehicles();
  };

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === 'ACTIVE').length;
  const inactiveVehicles = vehicles.filter((v) => v.status === 'INACTIVE').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'MAINTENANCE').length;

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = v.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || (statusFilter === 'ACTIVE' && v.status === 'ACTIVE') || (statusFilter === 'INACTIVE' && v.status === 'INACTIVE') || (statusFilter === 'MAINTENANCE' && v.status === 'MAINTENANCE');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 dark:bg-gray-900">
      {/* STATS SECTION */}
      <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-600 rounded-xl shadow p-6 hover:shadow-xl transition-all duration-300">
          <p className="text-sm text-blue-700 dark:text-blue-200 mb-1 font-semibold">Total Vehicles</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-blue-900 dark:text-white">{totalVehicles}</h2>
            <div className="w-6 h-6 bg-blue-600 rounded-full shadow-lg" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-600 rounded-xl shadow p-6 hover:shadow-xl transition-all duration-300">
          <p className="text-sm text-green-700 dark:text-green-200 mb-1 font-semibold">Active Vehicles</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-green-900 dark:text-white">{activeVehicles}</h2>
            <div className="w-6 h-6 bg-green-600 rounded-full shadow-lg" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-700 dark:to-yellow-500 rounded-xl shadow p-6 hover:shadow-xl transition-all duration-300">
          <p className="text-sm text-yellow-800 dark:text-yellow-100 mb-1 font-semibold">Inactive Vehicles</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-yellow-900 dark:text-white">{inactiveVehicles}</h2>
            <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800 dark:to-red-600 rounded-xl shadow p-6 hover:shadow-xl transition-all duration-300">
          <p className="text-sm text-red-700 dark:text-red-200 mb-1 font-semibold">Maintenance</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-red-900 dark:text-white">{maintenanceVehicles}</h2>
            <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg" />
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 mb-8 w-full transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search input */}
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Filter dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-sm"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>

          {/* Refresh button */}
          <button
            onClick={handleRetry}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium">Refresh</span>
          </button>
        </div>
      </div>

      {/* ERROR / LOADING */}
      {error && <ErrorMessage message={error} onRetry={handleRetry} onDismiss={clearError} className="mb-6 animate-fade-in" />}

      {loading && vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading vehicles...</p>
        </div>
      )}

      {!loading && !error && filteredVehicles.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No vehicles found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">There are no vehicles matching your search or filter.</p>
          <button onClick={handleRetry} className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
            Try Again
          </button>
        </div>
      )}

      {/* VEHICLE CARDS */}
      {!loading && filteredVehicles.length > 0 && (
        <div className="w-full animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetail={handleViewDetail} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
