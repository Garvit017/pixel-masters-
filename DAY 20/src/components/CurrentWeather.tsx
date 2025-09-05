import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { weatherUtils } from '../services/weatherApi';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  MapPin,
  Heart,
  Share2
} from 'lucide-react';
import { format } from 'date-fns';

export function CurrentWeather() {
  const { 
    currentWeather, 
    currentLocation, 
    unit, 
    favoriteLocations,
    addFavoriteLocation,
    removeFavoriteLocation 
  } = useWeatherStore();

  if (!currentWeather || !currentLocation) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const weather = currentWeather.weather[0];
  const isFavorite = favoriteLocations.some(loc => loc.id === currentLocation.id);
  const weatherBackground = weatherUtils.getWeatherBackground(weather?.main || 'Clear');
  const windDirection = weatherUtils.formatWindDirection(currentWeather.wind.deg);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteLocation(currentLocation.id);
    } else {
      addFavoriteLocation(currentLocation);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Weather in ${currentLocation.name}`,
          text: `Current temperature: ${Math.round(currentWeather.main.temp)}${weatherUtils.getTemperatureUnit(unit)}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Weather in ${currentLocation.name}: ${Math.round(currentWeather.main.temp)}${weatherUtils.getTemperatureUnit(unit)}`
      );
    }
  };

  return (
    <div className={`${weatherBackground} rounded-lg shadow-lg p-6 text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5" />
          <div>
            <h2 className="text-xl font-bold">{currentLocation.name}</h2>
            <p className="text-sm opacity-90">
              {currentLocation.state && `${currentLocation.state}, `}
              {currentLocation.country}
            </p>
            <p className="text-xs opacity-75">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-6xl">
            <img
              src={weatherUtils.getWeatherIconUrl(weather?.icon || '01d', '4x')}
              alt={weather?.description}
              className="w-20 h-20"
            />
          </div>
          <div>
            <div className="text-5xl font-bold">
              {Math.round(currentWeather.main.temp)}°
            </div>
            <div className="text-lg opacity-90 capitalize">
              {weather?.description}
            </div>
            <div className="text-sm opacity-75">
              Feels like {Math.round(currentWeather.main.feels_like)}°
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm opacity-75">
            H: {Math.round(currentWeather.main.temp_max)}° L: {Math.round(currentWeather.main.temp_min)}°
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-sm opacity-90">Humidity</span>
          </div>
          <div className="text-lg font-semibold">{currentWeather.main.humidity}%</div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-sm opacity-90">Wind</span>
          </div>
          <div className="text-lg font-semibold">
            {currentWeather.wind.speed} {weatherUtils.getWindSpeedUnit(unit)}
          </div>
          <div className="text-xs opacity-75">{windDirection}</div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Gauge className="w-4 h-4" />
            <span className="text-sm opacity-90">Pressure</span>
          </div>
          <div className="text-lg font-semibold">{currentWeather.main.pressure} hPa</div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Eye className="w-4 h-4" />
            <span className="text-sm opacity-90">Visibility</span>
          </div>
          <div className="text-lg font-semibold">
            {(currentWeather.visibility / 1000).toFixed(1)} km
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="relative z-10 mt-6 flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <Sunrise className="w-5 h-5" />
          <div>
            <div className="text-sm opacity-75">Sunrise</div>
            <div className="font-semibold">
              {format(new Date(currentWeather.sys.sunrise * 1000), 'h:mm a')}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Sunset className="w-5 h-5" />
          <div>
            <div className="text-sm opacity-75">Sunset</div>
            <div className="font-semibold">
              {format(new Date(currentWeather.sys.sunset * 1000), 'h:mm a')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
