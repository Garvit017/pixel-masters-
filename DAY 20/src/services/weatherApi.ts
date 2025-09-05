import axios from 'axios';
import { CurrentWeather, ForecastData, Location } from '../types';

// OpenWeatherMap API configuration
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0';

// For demo purposes, we'll use a demo API key
// In production, you should get your own API key from https://openweathermap.org/api
const API_KEY = 'demo_key'; // Replace with your actual API key

// Create axios instance
const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const geocodingApi = axios.create({
  baseURL: GEOCODING_API_URL,
  timeout: 10000,
});

// Request interceptor to add API key
weatherApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: API_KEY,
  };
  return config;
});

geocodingApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: API_KEY,
  };
  return config;
});

// Weather API functions
export const weatherApiService = {
  // Get current weather by coordinates
  getCurrentWeather: async (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeather> => {
    try {
      const response = await weatherApi.get('/weather', {
        params: {
          lat,
          lon,
          units,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather data');
    }
  },

  // Get 5-day weather forecast by coordinates
  getForecast: async (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
    try {
      const response = await weatherApi.get('/forecast', {
        params: {
          lat,
          lon,
          units,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch forecast data');
    }
  },

  // Get current weather by city name
  getCurrentWeatherByCity: async (cityName: string, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeather> => {
    try {
      const response = await weatherApi.get('/weather', {
        params: {
          q: cityName,
          units,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw new Error('Failed to fetch weather data for the specified city');
    }
  },

  // Get forecast by city name
  getForecastByCity: async (cityName: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
    try {
      const response = await weatherApi.get('/forecast', {
        params: {
          q: cityName,
          units,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast by city:', error);
      throw new Error('Failed to fetch forecast data for the specified city');
    }
  },
};

// Geocoding API functions
export const geocodingApiService = {
  // Search for locations by name
  searchLocations: async (query: string, limit: number = 5): Promise<Location[]> => {
    try {
      const response = await geocodingApi.get('/direct', {
        params: {
          q: query,
          limit,
        },
      });
      
      return response.data.map((item: any) => ({
        id: `${item.lat}-${item.lon}`,
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      throw new Error('Failed to search locations');
    }
  },

  // Get location by coordinates (reverse geocoding)
  getLocationByCoords: async (lat: number, lon: number): Promise<Location> => {
    try {
      const response = await geocodingApi.get('/reverse', {
        params: {
          lat,
          lon,
          limit: 1,
        },
      });
      
      const item = response.data[0];
      return {
        id: `${item.lat}-${item.lon}`,
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
      };
    } catch (error) {
      console.error('Error getting location by coordinates:', error);
      throw new Error('Failed to get location information');
    }
  },
};

// Geolocation service
export const geolocationService = {
  // Get current position
  getCurrentPosition: (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          let errorMessage = 'Failed to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  },

  // Watch position changes
  watchPosition: (
    onSuccess: (position: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void
  ): number => {
    if (!navigator.geolocation) {
      onError({
        code: 0,
        message: 'Geolocation is not supported by this browser',
      } as GeolocationPositionError);
      return -1;
    }

    return navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  },

  // Clear position watch
  clearWatch: (watchId: number): void => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  },
};

// Utility functions
export const weatherUtils = {
  // Convert temperature based on unit
  convertTemperature: (temp: number, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial'): number => {
    if (fromUnit === toUnit) return temp;
    
    if (fromUnit === 'metric' && toUnit === 'imperial') {
      return (temp * 9/5) + 32;
    } else if (fromUnit === 'imperial' && toUnit === 'metric') {
      return (temp - 32) * 5/9;
    }
    
    return temp;
  },

  // Get temperature unit symbol
  getTemperatureUnit: (unit: 'metric' | 'imperial'): string => {
    return unit === 'metric' ? '°C' : '°F';
  },

  // Get wind speed unit
  getWindSpeedUnit: (unit: 'metric' | 'imperial'): string => {
    return unit === 'metric' ? 'm/s' : 'mph';
  },

  // Get weather icon URL
  getWeatherIconUrl: (iconCode: string, size: '2x' | '4x' = '2x'): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  },

  // Get weather background based on weather condition
  getWeatherBackground: (weatherMain: string, isDay: boolean = true): string => {
    const backgrounds = {
      Clear: isDay ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-indigo-900 to-purple-900',
      Clouds: 'bg-gradient-to-br from-gray-400 to-gray-600',
      Rain: 'bg-gradient-to-br from-blue-600 to-blue-800',
      Snow: 'bg-gradient-to-br from-blue-100 to-blue-200',
      Thunderstorm: 'bg-gradient-to-br from-purple-800 to-gray-900',
      Drizzle: 'bg-gradient-to-br from-blue-400 to-blue-600',
      Mist: 'bg-gradient-to-br from-gray-300 to-gray-500',
      Fog: 'bg-gradient-to-br from-gray-300 to-gray-500',
      Haze: 'bg-gradient-to-br from-yellow-200 to-orange-300',
      Dust: 'bg-gradient-to-br from-yellow-300 to-orange-400',
      Sand: 'bg-gradient-to-br from-yellow-300 to-orange-400',
      Ash: 'bg-gradient-to-br from-gray-500 to-gray-700',
      Squall: 'bg-gradient-to-br from-blue-700 to-blue-900',
      Tornado: 'bg-gradient-to-br from-gray-800 to-black',
    };

    return backgrounds[weatherMain as keyof typeof backgrounds] || 'bg-gradient-to-br from-gray-400 to-gray-600';
  },

  // Format wind direction
  formatWindDirection: (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  },

  // Get UV index description
  getUVIndexDescription: (uvIndex: number): { level: string; color: string; description: string } => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-600', description: 'Minimal protection required' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600', description: 'Some protection required' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600', description: 'Protection required' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600', description: 'Extra protection required' };
    return { level: 'Extreme', color: 'text-purple-600', description: 'Avoid sun exposure' };
  },
};
