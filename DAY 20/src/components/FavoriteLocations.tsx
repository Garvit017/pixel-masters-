import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { Location } from '../types';
import { MapPin, Heart, Trash2, Navigation } from 'lucide-react';

export function FavoriteLocations() {
  const { 
    favoriteLocations, 
    currentLocation,
    removeFavoriteLocation,
    setCurrentLocation,
    fetchWeatherData,
    fetchForecastData
  } = useWeatherStore();

  const handleLocationSelect = async (location: Location) => {
    setCurrentLocation(location);
    
    await Promise.all([
      fetchWeatherData(location.lat, location.lon),
      fetchForecastData(location.lat, location.lon),
    ]);
  };

  const handleRemoveFavorite = (locationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeFavoriteLocation(locationId);
  };

  if (favoriteLocations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Favorite Locations</h3>
          <p className="text-gray-600 text-sm">
            Add locations to your favorites to quickly access them
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Favorite Locations</h3>
        <div className="text-sm text-gray-500">
          {favoriteLocations.length} location{favoriteLocations.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-2">
        {favoriteLocations.map((location) => (
          <div
            key={location.id}
            onClick={() => handleLocationSelect(location)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              currentLocation?.id === location.id
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentLocation?.id === location.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {location.isCurrent ? (
                  <Navigation className="w-4 h-4" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {location.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {location.state && `${location.state}, `}
                  {location.country}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {currentLocation?.id === location.id && (
                <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  Current
                </div>
              )}
              
              <button
                onClick={(e) => handleRemoveFavorite(location.id, e)}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Remove from favorites"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
