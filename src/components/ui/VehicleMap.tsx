import { Icon, LatLngBounds } from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import type { Vehicle } from '../../types/vehicle';

const createVehicleIcon = (status: Vehicle['status']) => {
  let color = '#3b82f6'; // blue for active
  if (status === 'INACTIVE') color = '#ef4444'; // red
  if (status === 'MAINTENANCE') color = '#f59e0b'; // yellow

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(` 
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

interface VehicleMapProps {
  vehicles: Vehicle[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const FitBounds: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const map = useMap();

  useEffect(() => {
    if (vehicles.length > 0) {
      const bounds = new LatLngBounds(vehicles.map((vehicle) => [-6.2 + vehicle.id * 0.05, 106.8 + vehicle.id * 0.03]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [vehicles, map]);

  return null;
};

export const VehicleMap: React.FC<VehicleMapProps> = ({ vehicles, center = [-6.2, 106.8], zoom = 11, height = '300px' }) => {
  return (
    <div className="map-container" style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {vehicles.map((vehicle) => {
          const lat = -6.2 + vehicle.id * 0.05;
          const lng = 106.8 + vehicle.id * 0.03;

          return (
            <Marker key={vehicle.id} position={[lat, lng]} icon={createVehicleIcon(vehicle.status)}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600">Status: {vehicle.status}</p>
                  <p className="text-sm text-gray-600">Speed: {vehicle.speed} km/h</p>
                  <p className="text-xs text-gray-500 mt-1">Last updated: {new Date(vehicle.updated_at).toLocaleString('id-ID')}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <FitBounds vehicles={vehicles} />
      </MapContainer>
    </div>
  );
};
