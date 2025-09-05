import React, { useState } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { WeatherAlert } from '../types';
import { AlertTriangle, X, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export function WeatherAlerts() {
  const { weatherAlerts } = useWeatherStore();
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'bg-red-600 text-white';
      case 'severe':
        return 'bg-red-500 text-white';
      case 'moderate':
        return 'bg-yellow-500 text-white';
      case 'minor':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return '🔴';
      case 'moderate':
        return '🟡';
      case 'minor':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return '🌤️';
      case 'flood':
        return '🌊';
      case 'wind':
        return '💨';
      case 'snow':
        return '❄️';
      case 'fog':
        return '🌫️';
      default:
        return '⚠️';
    }
  };

  if (weatherAlerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Weather Alerts</h3>
          <p className="text-gray-600 text-sm">
            All clear! No weather alerts for your area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Weather Alerts</h3>
        <div className="text-sm text-gray-500">
          {weatherAlerts.length} alert{weatherAlerts.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-3">
        {weatherAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 rounded-lg shadow-sm ${
              alert.severity === 'extreme' || alert.severity === 'severe'
                ? 'border-red-500 bg-red-50'
                : alert.severity === 'moderate'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">
                    {getTypeIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {alert.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {format(alert.start, 'MMM d, h:mm a')} - {format(alert.end, 'MMM d, h:mm a')}
                        </span>
                      </div>
                    </div>

                    {alert.areas.length > 0 && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.areas.join(', ')}</span>
                      </div>
                    )}

                    <p className="text-sm text-gray-700 line-clamp-2">
                      {alert.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedAlert === alert.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedAlert === alert.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Full Description</h5>
                      <p className="text-sm text-gray-700">{alert.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Start Time</h5>
                        <p className="text-sm text-gray-600">
                          {format(alert.start, 'EEEE, MMMM d, yyyy h:mm a')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(alert.start, { addSuffix: true })}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">End Time</h5>
                        <p className="text-sm text-gray-600">
                          {format(alert.end, 'EEEE, MMMM d, yyyy h:mm a')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(alert.end, { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    {alert.areas.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Affected Areas</h5>
                        <div className="flex flex-wrap gap-2">
                          {alert.areas.map((area, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
