'use client';

import { ArrowLeft, Car, Clock, Fuel, Gauge, MapPin } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useVehicleStore } from '../store/vehicleStore';

export const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, telemetry, loading, error, fetchVehicleTelemetry, clearTelemetry, clearError } = useVehicleStore();

  const vehicleId = id ? parseInt(id) : 0;
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleTelemetry(vehicleId);
    }
    return () => clearTelemetry();
  }, [vehicleId, fetchVehicleTelemetry, clearTelemetry]);

  const handleRetry = () => {
    clearError();
    fetchVehicleTelemetry(vehicleId);
  };

  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return 'bg-green-100 text-green-600';
    if (level > 20) return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-red-600';
  };

  const getVehicleImage = (name: string): string | null => {
    const imageMap: { [key: string]: string } = {
      avanza: 'Avanza.jpg',
      ertiga: 'Ertiga.jpg',
      livina: 'Livina.jpg',
      terios: 'Terios.jpg',
      xpander: 'Xpander.jpg',
      'honda cr-v': 'Honda CR-V.jpg',
      crv: 'Honda CR-V.jpg',
    };

    const lowerName = name.toLowerCase();
    for (const key in imageMap) {
      if (lowerName.includes(key)) {
        return `/images/${imageMap[key]}`;
      }
    }

    return null;
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 dark:bg-gray-950">
      {}
      <div className="pt-6 pb-4 px-6">
        <button onClick={() => navigate('/')} className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 transition-transform hover:scale-105">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vehicle List
        </button>
      </div>

      <div className="px-6 pb-10 space-y-6 w-full">
        {}
        {vehicle && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow flex items-center w-full">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-4 flex items-center justify-center w-20 h-20">
              {getVehicleImage(vehicle.name) ? <img src={getVehicleImage(vehicle.name)!} alt={vehicle.name} className="w-full h-full object-cover rounded-lg" /> : <Car className="w-8 h-8 text-white" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle ID: {vehicle.id}</p>
            </div>
          </div>
        )}

        {}
        {error && <ErrorMessage message={error} onRetry={handleRetry} onDismiss={clearError} className="mb-6" />}

        {}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading telemetry data...</p>
          </div>
        )}

        {}
        {!loading && !error && telemetry && (
          <div className="space-y-6 animate-fade-in w-full">
            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="card hover:shadow-lg transition-shadow text-center p-6 rounded-xl w-full">
                <Gauge className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Speed</p>
                <p className="text-2xl font-bold text-gray-900">{telemetry.speed} km/h</p>
              </div>

              <div className="card hover:shadow-lg transition-shadow text-center p-6 rounded-xl w-full">
                <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${getFuelLevelColor(telemetry.fuel_level)}`}>
                  <Fuel className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600">Fuel Level</p>
                <p className="text-2xl font-bold text-gray-900">{telemetry.fuel_level.toFixed(1)}%</p>
              </div>

              <div className="card hover:shadow-lg transition-shadow text-center p-6 rounded-xl w-full">
                <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Odometer</p>
                <p className="text-2xl font-bold text-gray-900">{telemetry.odometer.toLocaleString()} km</p>
              </div>
            </div>

            {}
            <div className="card bg-white dark:bg-gray-900 p-6 rounded-2xl shadow w-full">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Detailed Telemetry</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailItem icon={<Clock />} label="Last Update" value={formatDateTime(telemetry.timestamp)} />
                  <DetailItem icon={<Gauge />} label="Speed" value={`${telemetry.speed} km/h`} />
                  <DetailItem icon={<Car />} label="Distance" value={`${telemetry.odometer.toFixed(2)} km`} />
                </div>
                <div className="space-y-4">
                  <DetailItem icon={<Fuel />} label="Fuel" value={`${telemetry.fuel_level.toFixed(1)}%`} colorClass={getFuelLevelColor(telemetry.fuel_level)} />
                  <DetailItem icon={<MapPin />} label="Latitude" value={`${telemetry.latitude}°`} />
                  <DetailItem icon={<MapPin />} label="Longitude" value={`${telemetry.longitude}°`} />
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {!loading && !error && !telemetry && (
          <div className="text-center py-12 w-full">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No telemetry data available</h3>
            <p className="text-gray-500 mb-4">Unable to retrieve telemetry data for this vehicle.</p>
            <button onClick={handleRetry} className="btn-primary">
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, colorClass = 'text-gray-400' }: { icon: React.ReactNode; label: string; value: string; colorClass?: string }) => (
  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl w-full">
    <div className={`w-6 h-6 flex items-center justify-center mr-3 ${colorClass}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-sm text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);
