import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useWeatherStore } from '../store/useWeatherStore';
import { weatherUtils } from '../services/weatherApi';
import { MapPin, Thermometer, Droplets, Wind, Eye } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom weather marker icon
const createWeatherIcon = (weatherIcon: string, temperature: number) => {
  return L.divIcon({
    html: `
      <div class="weather-marker">
        <div class="weather-icon">
          <img src="${weatherUtils.getWeatherIconUrl(weatherIcon)}" alt="weather" />
        </div>
        <div class="temperature">${Math.round(temperature)}°</div>
      </div>
    `,
    className: 'custom-weather-marker',
    iconSize: [60, 40],
    iconAnchor: [30, 40],
  });
};

interface MapCenterProps {
  center: [number, number];
  zoom: number;
}

function MapCenter({ center, zoom }: MapCenterProps) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

export function WeatherMap() {
  const { currentWeather, currentLocation, unit } = useWeatherStore();
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]);
  const [mapZoom, setMapZoom] = useState(10);

  useEffect(() => {
    if (currentLocation) {
      setMapCenter([currentLocation.lat, currentLocation.lon]);
    }
  }, [currentLocation]);

  if (!currentWeather || !currentLocation) {
    return (
      <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No location selected</p>
        </div>
      </div>
    );
  }

  const weatherIcon = currentWeather.weather[0]?.icon || '01d';
  const temperature = currentWeather.main.temp;
  const customIcon = createWeatherIcon(weatherIcon, temperature);

  return (
    <div className="h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapCenter center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker
          position={[currentLocation.lat, currentLocation.lon]}
          icon={customIcon}
        >
          <Popup>
            <div className="weather-popup">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={weatherUtils.getWeatherIconUrl(weatherIcon)}
                  alt={currentWeather.weather[0]?.description}
                  className="w-8 h-8"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{currentLocation.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {currentWeather.weather[0]?.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">Temperature</span>
                  </div>
                  <span className="font-medium">
                    {Math.round(temperature)}{weatherUtils.getTemperatureUnit(unit)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity</span>
                  </div>
                  <span className="font-medium">{currentWeather.main.humidity}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Wind</span>
                  </div>
                  <span className="font-medium">
                    {currentWeather.wind.speed} {weatherUtils.getWindSpeedUnit(unit)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Visibility</span>
                  </div>
                  <span className="font-medium">
                    {(currentWeather.visibility / 1000).toFixed(1)} km
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      <style jsx>{`
        .weather-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          border-radius: 8px;
          padding: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          border: 2px solid #3b82f6;
        }
        
        .weather-icon img {
          width: 24px;
          height: 24px;
        }
        
        .temperature {
          font-size: 12px;
          font-weight: bold;
          color: #1f2937;
          margin-top: 2px;
        }
        
        .weather-popup {
          min-width: 200px;
        }
        
        .custom-weather-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}

export function WeatherMapFullscreen() {
  const { currentWeather, currentLocation, unit } = useWeatherStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!currentWeather || !currentLocation) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleFullscreen}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        <MapPin className="w-4 h-4" />
        <span>View Full Map</span>
      </button>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full h-[80vh] relative">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="h-full p-4">
              <WeatherMap />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
