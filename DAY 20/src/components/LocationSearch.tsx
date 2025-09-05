import React, { useState, useEffect, useRef } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { Location } from '../types';
import { Search, MapPin, Clock, Heart, X, Navigation } from 'lucide-react';
import { format } from 'date-fns';

export function LocationSearch() {
  const { 
    searchLocation, 
    currentLocation, 
    searchHistory, 
    favoriteLocations,
    addToSearchHistory,
    setCurrentLocation,
    fetchWeatherData,
    fetchForecastData,
    clearSearchHistory
  } = useWeatherStore();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchLocation(searchQuery);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      handleSearch(value);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleLocationSelect = async (location: Location) => {
    setCurrentLocation(location);
    addToSearchHistory(location);
    setQuery('');
    setShowResults(false);
    setShowHistory(false);
    
    await Promise.all([
      fetchWeatherData(location.lat, location.lon),
      fetchForecastData(location.lat, location.lon),
    ]);
  };

  const handleGetCurrentLocation = async () => {
    try {
      await useWeatherStore.getState().getCurrentLocation();
      setQuery('');
      setShowResults(false);
      setShowHistory(false);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const isFavorite = (location: Location) => {
    return favoriteLocations.some(fav => fav.id === location.id);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchHistory.length > 0) {
              setShowHistory(true);
            }
          }}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Current Location Button */}
      <button
        onClick={handleGetCurrentLocation}
        className="w-full mt-2 flex items-center justify-center space-x-2 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Navigation className="w-4 h-4" />
        <span className="text-sm font-medium">Use Current Location</span>
      </button>

      {/* Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Search Results
            </div>
            {results.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                  <MapPin size={16} />
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
                {isFavorite(location) && (
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Recent Searches
              </div>
              <button
                onClick={clearSearchHistory}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            </div>
            {searchHistory.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
                  <Clock size={16} />
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
                {isFavorite(location) && (
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && results.length === 0 && query.trim() && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No locations found</p>
            <p className="text-xs text-gray-500">Try a different search term</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Searching...</p>
          </div>
        </div>
      )}
    </div>
  );
}
