import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherState, WeatherActions, CurrentWeather, ForecastData, Location, WeatherAlert } from '../types';
import { weatherApiService, geocodingApiService, geolocationService } from '../services/weatherApi';
import { mockCurrentWeather, mockForecastData, mockLocations, mockWeatherAlerts } from '../data/mockData';

interface WeatherStore extends WeatherState, WeatherActions {}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWeather: mockCurrentWeather,
      forecast: mockForecastData,
      currentLocation: mockLocations[0],
      favoriteLocations: mockLocations.filter(loc => loc.isFavorite),
      searchHistory: [],
      weatherAlerts: mockWeatherAlerts,
      isLoading: false,
      error: null,
      unit: 'metric',
      theme: 'light',

      // Actions
      setCurrentWeather: (weather) => set({ currentWeather: weather }),

      setForecast: (forecast) => set({ forecast }),

      setCurrentLocation: (location) => set({ currentLocation: location }),

      addFavoriteLocation: (location) => set((state) => ({
        favoriteLocations: [...state.favoriteLocations, { ...location, isFavorite: true }],
      })),

      removeFavoriteLocation: (locationId) => set((state) => ({
        favoriteLocations: state.favoriteLocations.filter(loc => loc.id !== locationId),
      })),

      addToSearchHistory: (location) => set((state) => {
        const existingIndex = state.searchHistory.findIndex(loc => loc.id === location.id);
        let newHistory = [...state.searchHistory];
        
        if (existingIndex >= 0) {
          // Move to front if already exists
          newHistory.splice(existingIndex, 1);
        }
        
        newHistory = [location, ...newHistory].slice(0, 10); // Keep only last 10
        return { searchHistory: newHistory };
      }),

      clearSearchHistory: () => set({ searchHistory: [] }),

      setWeatherAlerts: (alerts) => set({ weatherAlerts: alerts }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setUnit: (unit) => set({ unit }),

      setTheme: (theme) => set({ theme }),

      // API calls
      fetchWeatherData: async (lat: number, lon: number) => {
        const { unit, setLoading, setError, setCurrentWeather } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          // For demo purposes, we'll use mock data
          // In production, uncomment the following lines:
          // const weather = await weatherApiService.getCurrentWeather(lat, lon, unit);
          // setCurrentWeather(weather);
          
          // Using mock data for demo
          const mockWeather = {
            ...mockCurrentWeather,
            coord: { lat, lon },
            main: {
              ...mockCurrentWeather.main,
              temp: mockCurrentWeather.main.temp + (Math.random() - 0.5) * 10,
            },
          };
          setCurrentWeather(mockWeather);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },

      fetchForecastData: async (lat: number, lon: number) => {
        const { unit, setLoading, setError, setForecast } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          // For demo purposes, we'll use mock data
          // In production, uncomment the following lines:
          // const forecast = await weatherApiService.getForecast(lat, lon, unit);
          // setForecast(forecast);
          
          // Using mock data for demo
          setForecast(mockForecastData);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to fetch forecast data');
        } finally {
          setLoading(false);
        }
      },

      searchLocation: async (query: string) => {
        const { setError } = get();
        
        try {
          setError(null);
          
          // For demo purposes, we'll filter mock locations
          // In production, uncomment the following lines:
          // const locations = await geocodingApiService.searchLocations(query);
          // return locations;
          
          // Using mock data for demo
          const filteredLocations = mockLocations.filter(loc =>
            loc.name.toLowerCase().includes(query.toLowerCase()) ||
            loc.country.toLowerCase().includes(query.toLowerCase())
          );
          
          return filteredLocations;
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to search locations');
          return [];
        }
      },

      getCurrentLocation: async () => {
        const { setLoading, setError, setCurrentLocation, fetchWeatherData, fetchForecastData, addToSearchHistory } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          // For demo purposes, we'll use mock location
          // In production, uncomment the following lines:
          // const position = await geolocationService.getCurrentPosition();
          // const location = await geocodingApiService.getLocationByCoords(
          //   position.coords.latitude,
          //   position.coords.longitude
          // );
          
          // Using mock data for demo
          const mockLocation = {
            ...mockLocations[0],
            isCurrent: true,
          };
          
          setCurrentLocation(mockLocation);
          addToSearchHistory(mockLocation);
          
          await Promise.all([
            fetchWeatherData(mockLocation.lat, mockLocation.lon),
            fetchForecastData(mockLocation.lat, mockLocation.lon),
          ]);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to get current location');
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'weather-app-storage',
      partialize: (state) => ({
        favoriteLocations: state.favoriteLocations,
        searchHistory: state.searchHistory,
        unit: state.unit,
        theme: state.theme,
      }),
    }
  )
);
