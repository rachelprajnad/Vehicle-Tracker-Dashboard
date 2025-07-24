import { Car, Clock, Gauge, MapPin } from 'lucide-react';
import React from 'react';
import type { Vehicle } from '../../types/vehicle';
import { StatusBadge } from './StatusBadge';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetail: (id: number) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onViewDetail }) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSpeedColor = (speed: number) => {
    if (speed === 0) return 'text-gray-500';
    if (speed <= 60) return 'text-success-600';
    if (speed <= 100) return 'text-warning-600';
    return 'text-error-600';
  };

  // Mapping nama kendaraan nama file gambar
  const imageMap: { [key: string]: string } = {
    avanza: 'Avanza.jpg',
    ertiga: 'Ertiga.jpg',
    livina: 'Livina.jpg',
    terios: 'Terios.jpg',
    xpander: 'Xpander.jpg',
    'honda cr-v': 'Honda CR-V.jpg',
    crv: 'Honda CR-V.jpg',
  };

  const getVehicleImage = () => {
    const lowerName = vehicle.name.toLowerCase();
    for (const key in imageMap) {
      if (lowerName.includes(key)) {
        return `/images/${imageMap[key]}`;
      }
    }
    return null;
  };

  const vehicleImage = getVehicleImage();

  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col group hover:scale-105 transform border border-gray-100">
      {}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
        {vehicleImage ? <img src={vehicleImage} alt={vehicle.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /> : <Car className="w-12 h-12 text-white opacity-80" />}
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>

        {}
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 rounded-full ${vehicle.status === 'ACTIVE' ? 'bg-success-400' : vehicle.status === 'MAINTENANCE' ? 'bg-warning-400' : 'bg-error-400'} shadow-lg animate-pulse-slow`}></div>
        </div>
      </div>

      {}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{vehicle.name}</h3>
            <p className="text-xs text-gray-500 font-medium">ID: {vehicle.id}</p>
          </div>
          <StatusBadge status={vehicle.status} className="text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm my-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Gauge className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium">Speed</p>
              <p className={`font-bold ${getSpeedColor(vehicle.speed)}`}>{vehicle.speed} km/h</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium">Updated</p>
              <p className="text-gray-900 font-semibold text-xs">{formatDateTime(vehicle.updated_at)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-4">
          <MapPin className="w-3 h-3 mr-1" />
          <span>Jakarta, Indonesia</span>
        </div>

        <button
          onClick={() => onViewDetail(vehicle.id)}
          className="mt-auto w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-200 rounded-xl py-3 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
