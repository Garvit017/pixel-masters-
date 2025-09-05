import { CurrentWeather, ForecastData, Location, WeatherAlert } from '../types';

export const mockCurrentWeather: CurrentWeather = {
  coord: { lon: -74.006, lat: 40.7128 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 22.5,
    feels_like: 24.1,
    temp_min: 20.0,
    temp_max: 25.0,
    pressure: 1013,
    humidity: 65,
    sea_level: 1013,
    grnd_level: 1010
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 230,
    gust: 5.2
  },
  clouds: {
    all: 0
  },
  dt: 1704067200,
  sys: {
    type: 2,
    id: 2008101,
    country: 'US',
    sunrise: 1704024000,
    sunset: 1704057600
  },
  timezone: -18000,
  id: 5128581,
  name: 'New York',
  cod: 200
};

export const mockForecastData: ForecastData = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1704067200,
      main: {
        temp: 22.5,
        feels_like: 24.1,
        temp_min: 20.0,
        temp_max: 25.0,
        pressure: 1013,
        humidity: 65
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.6, deg: 230 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-01-01 12:00:00'
    },
    {
      dt: 1704078000,
      main: {
        temp: 20.1,
        feels_like: 21.5,
        temp_min: 18.0,
        temp_max: 22.0,
        pressure: 1015,
        humidity: 70
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02n'
        }
      ],
      clouds: { all: 20 },
      wind: { speed: 2.8, deg: 200 },
      visibility: 10000,
      pop: 0.1,
      sys: { pod: 'n' },
      dt_txt: '2024-01-01 15:00:00'
    },
    {
      dt: 1704088800,
      main: {
        temp: 18.5,
        feels_like: 19.2,
        temp_min: 16.0,
        temp_max: 20.0,
        pressure: 1017,
        humidity: 75
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: { all: 80 },
      wind: { speed: 4.2, deg: 180 },
      visibility: 8000,
      pop: 0.8,
      rain: { '3h': 2.5 },
      sys: { pod: 'n' },
      dt_txt: '2024-01-01 18:00:00'
    }
  ],
  city: {
    id: 5128581,
    name: 'New York',
    coord: { lat: 40.7128, lon: -74.006 },
    country: 'US',
    population: 8336817,
    timezone: -18000,
    sunrise: 1704024000,
    sunset: 1704057600
  }
};

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'New York',
    country: 'US',
    state: 'NY',
    lat: 40.7128,
    lon: -74.006,
    isCurrent: true,
    isFavorite: true
  },
  {
    id: '2',
    name: 'London',
    country: 'GB',
    lat: 51.5074,
    lon: -0.1278,
    isFavorite: true
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'JP',
    lat: 35.6762,
    lon: 139.6503,
    isFavorite: false
  },
  {
    id: '4',
    name: 'Paris',
    country: 'FR',
    lat: 48.8566,
    lon: 2.3522,
    isFavorite: true
  },
  {
    id: '5',
    name: 'Sydney',
    country: 'AU',
    lat: -33.8688,
    lon: 151.2093,
    isFavorite: false
  }
];

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: '1',
    title: 'Heat Wave Warning',
    description: 'Extreme heat expected with temperatures reaching 40°C. Stay hydrated and avoid outdoor activities during peak hours.',
    severity: 'severe',
    start: new Date('2024-01-15T10:00:00'),
    end: new Date('2024-01-17T18:00:00'),
    areas: ['New York', 'New Jersey', 'Connecticut'],
    type: 'weather'
  },
  {
    id: '2',
    title: 'Flood Watch',
    description: 'Heavy rainfall may cause flooding in low-lying areas. Monitor local conditions and avoid flooded roads.',
    severity: 'moderate',
    start: new Date('2024-01-16T06:00:00'),
    end: new Date('2024-01-16T20:00:00'),
    areas: ['Brooklyn', 'Queens'],
    type: 'flood'
  },
  {
    id: '3',
    title: 'Wind Advisory',
    description: 'Strong winds up to 50 mph expected. Secure loose objects and use caution when driving.',
    severity: 'minor',
    start: new Date('2024-01-18T12:00:00'),
    end: new Date('2024-01-18T22:00:00'),
    areas: ['Manhattan', 'Bronx'],
    type: 'wind'
  }
];
