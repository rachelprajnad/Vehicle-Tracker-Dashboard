'use client';

import { ArrowLeft, Car, Clock, ExternalLink, Fuel, Gauge, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useVehicleStore } from '../store/vehicleStore';

export const VehicleDetailPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, telemetry, loading, error, fetchVehicles, fetchVehicleTelemetry, clearTelemetry, clearError } = useVehicleStore();

  const vehicleId = id ? parseInt(id) : 0;
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (vehicles.length === 0) fetchVehicles();
  }, []);

  useEffect(() => {
    if (vehicleId && vehicle) fetchVehicleTelemetry(vehicleId);
    return () => clearTelemetry();
  }, [vehicleId, vehicle]);

  const handleRetry = () => {
    clearError();
    if (vehicleId) fetchVehicleTelemetry(vehicleId);
  };

  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return 'bg-green-100 text-green-700';
    if (level > 20) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
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

  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-primary-600 text-white select-none">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">Vehicle Tracker</h1>
          <p className="text-lg opacity-80">Loading your data...</p>
          <div className="mt-8">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="pt-6 pb-4 px-0 w-full">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Vehicle List
        </button>
      </div>

      <main className="w-screen px-0 pb-16 space-y-10">
        {vehicle ? (
          <section className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 gap-8 w-full max-w-full">
            <div className="flex-shrink-0 rounded-3xl bg-gradient-to-tr from-primary-600 to-primary-400 p-1 shadow-lg w-36 h-36 flex items-center justify-center">
              {getVehicleImage(vehicle.name) ? <img src={getVehicleImage(vehicle.name)!} alt={vehicle.name} className="w-full h-full object-cover rounded-2xl" loading="lazy" draggable={false} /> : <Car className="w-12 h-12 text-white" />}
            </div>

            <div className="flex flex-col space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{vehicle.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Vehicle ID: <span className="font-mono">{vehicle.id}</span>
              </p>
              <p className="text-sm text-gray-400 italic">Complete vehicle details</p>
            </div>
          </section>
        ) : !loading ? (
          <div className="text-center text-red-600 dark:text-red-400 font-semibold text-lg mt-12">Vehicle not found.</div>
        ) : null}

        {error && <ErrorMessage message={error} onRetry={handleRetry} onDismiss={clearError} className="max-w-xl mx-auto" />}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" />
            <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium tracking-wide">Loading telemetry data...</p>
          </div>
        )}

        {!loading && !error && telemetry && (
          <section className="space-y-8 animate-fade-in w-full max-w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <TelemetryCard icon={<Gauge className="w-10 h-10 text-primary-600 mx-auto mb-4" />} label="Speed" value={`${telemetry.speed} km/h`} />
              <TelemetryCard
                icon={
                  <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md ${getFuelLevelColor(telemetry.fuel_level)}`}>
                    <Fuel className="w-6 h-6 text-white" />
                  </div>
                }
                label="Fuel Level"
                value={`${telemetry.fuel_level.toFixed(1)}%`}
              />
              <TelemetryCard icon={<MapPin className="w-10 h-10 text-primary-600 mx-auto mb-4" />} label="Odometer" value={`${telemetry.odometer.toLocaleString()} km`} />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 w-full max-w-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">Detailed Telemetry</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <DetailItem icon={<Clock />} label="Last Update" value={formatDateTime(telemetry.timestamp)} />
                  <DetailItem icon={<Gauge />} label="Speed" value={`${telemetry.speed} km/h`} />
                  <DetailItem icon={<Car />} label="Distance" value={`${telemetry.odometer.toFixed(2)} km`} />
                </div>

                <div className="space-y-6">
                  <DetailItem icon={<Fuel />} label="Fuel" value={`${telemetry.fuel_level.toFixed(1)}%`} colorClass={getFuelLevelColor(telemetry.fuel_level)} />
                  <DetailItem
                    icon={<MapPin />}
                    label="Location Coordinates"
                    value={
                      <>
                        <div className="font-mono text-base">
                          Latitude: {telemetry.latitude.toFixed(5)}°
                          <br />
                          Longitude: {telemetry.longitude.toFixed(5)}°
                        </div>
                        <a
                          href={`https://www.google.com/maps?q=${telemetry.latitude},${telemetry.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-semibold transition"
                        >
                          <ExternalLink className="w-5 h-5" />
                          View on Map
                        </a>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const TelemetryCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center">
    {icon}
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const DetailItem = ({ icon, label, value, colorClass = 'text-gray-400' }: { icon: React.ReactNode; label: string; value: React.ReactNode; colorClass?: string }) => (
  <div className="flex items-start bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm">
    <div className={`w-7 h-7 flex items-center justify-center mr-4 mt-1 ${colorClass}`}>{icon}</div>
    <div>
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</div>
      <div className="text-base font-medium text-gray-900 dark:text-white">{value}</div>
    </div>
  </div>
);
