import React, { useState } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { weatherUtils } from '../services/weatherApi';
import { format, isToday, isTomorrow } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

export function WeatherForecast() {
  const { forecast, unit } = useWeatherStore();
  const [viewType, setViewType] = useState<'daily' | 'hourly'>('daily');

  if (!forecast) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group forecast by day for daily view
  const dailyForecast = forecast.list.reduce((acc: any, item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date,
        items: [],
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        weather: item.weather[0],
        pop: item.pop,
      };
    }
    
    acc[dateKey].items.push(item);
    acc[dateKey].minTemp = Math.min(acc[dateKey].minTemp, item.main.temp_min);
    acc[dateKey].maxTemp = Math.max(acc[dateKey].maxTemp, item.main.temp_max);
    acc[dateKey].pop = Math.max(acc[dateKey].pop, item.pop);
    
    return acc;
  }, {});

  const dailyForecastArray = Object.values(dailyForecast).slice(0, 5);

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">5-Day Forecast</h3>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewType('daily')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
              viewType === 'daily'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Daily</span>
          </button>
          <button
            onClick={() => setViewType('hourly')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
              viewType === 'hourly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Hourly</span>
          </button>
        </div>
      </div>

      {/* Daily Forecast */}
      {viewType === 'daily' && (
        <div className="space-y-3">
          {dailyForecastArray.map((day: any, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-center min-w-[80px]">
                  <div className="text-sm font-medium text-gray-900">
                    {getDateLabel(day.date)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(day.date, 'MMM d')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={weatherUtils.getWeatherIconUrl(day.weather.icon)}
                    alt={day.weather.description}
                    className="w-10 h-10"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {day.weather.description}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(day.pop * 100)}% chance of rain
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round(day.maxTemp)}°
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round(day.minTemp)}°
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hourly Forecast */}
      {viewType === 'hourly' && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-4">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-600">Today</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {forecast.list.slice(0, 12).map((item, index) => (
              <div
                key={index}
                className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 mb-2">
                  {format(new Date(item.dt * 1000), 'h:mm a')}
                </div>
                
                <img
                  src={weatherUtils.getWeatherIconUrl(item.weather[0].icon)}
                  alt={item.weather[0].description}
                  className="w-8 h-8 mx-auto mb-2"
                />
                
                <div className="text-lg font-semibold text-gray-900">
                  {Math.round(item.main.temp)}°
                </div>
                
                <div className="text-xs text-gray-500 capitalize">
                  {item.weather[0].description}
                </div>
                
                {item.pop > 0 && (
                  <div className="text-xs text-blue-600 mt-1">
                    {Math.round(item.pop * 100)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
