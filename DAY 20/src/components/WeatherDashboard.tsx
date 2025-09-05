import React, { useState, useEffect } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecast } from './WeatherForecast';
import { WeatherMap, WeatherMapFullscreen } from './WeatherMap';
import { LocationSearch } from './LocationSearch';
import { FavoriteLocations } from './FavoriteLocations';
import { WeatherAlerts } from './WeatherAlerts';
import { 
  Map, 
  List, 
  Settings, 
  RefreshCw, 
  Sun, 
  Moon,
  Thermometer,
  Droplets,
  Wind,
  Eye
} from 'lucide-react';

export function WeatherDashboard() {
  const { 
    currentWeather, 
    currentLocation, 
    isLoading, 
    error, 
    unit, 
    theme,
    setUnit,
    setTheme,
    getCurrentLocation,
    fetchWeatherData,
    fetchForecastData
  } = useWeatherStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'forecast' | 'map' | 'alerts'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!currentWeather && !isLoading) {
      getCurrentLocation();
    }
  }, [currentWeather, isLoading, getCurrentLocation]);

  const handleRefresh = async () => {
    if (!currentLocation) return;
    
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchWeatherData(currentLocation.lat, currentLocation.lon),
        fetchForecastData(currentLocation.lat, currentLocation.lon),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Weather</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={getCurrentLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Weather Forecast
              </h1>
              {currentLocation && (
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {currentLocation.name}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleUnit}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Thermometer className="w-4 h-4" />
                <span className="text-sm font-medium">{unit === 'metric' ? '°C' : '°F'}</span>
              </button>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <LocationSearch />
            <FavoriteLocations />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Navigation Tabs */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border border-gray-200`}>
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'overview', label: 'Overview', icon: List },
                  { id: 'forecast', label: 'Forecast', icon: Sun },
                  { id: 'map', label: 'Map', icon: Map },
                  { id: 'alerts', label: 'Alerts', icon: Eye },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? `border-b-2 border-blue-500 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`
                          : `${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  <CurrentWeather />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WeatherMap />
                    <WeatherAlerts />
                  </div>
                </>
              )}

              {activeTab === 'forecast' && (
                <WeatherForecast />
              )}

              {activeTab === 'map' && (
                <WeatherMapFullscreen />
              )}

              {activeTab === 'alerts' && (
                <WeatherAlerts />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
