export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Rain {
  '1h'?: number;
  '3h'?: number;
}

export interface Snow {
  '1h'?: number;
  '3h'?: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface CurrentWeather {
  coord: Coord;
  weather: WeatherData[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: WeatherData[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface Location {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  isCurrent?: boolean;
  isFavorite?: boolean;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: Date;
  end: Date;
  areas: string[];
  type: 'weather' | 'flood' | 'wind' | 'snow' | 'fog' | 'other';
}

export interface WeatherState {
  currentWeather: CurrentWeather | null;
  forecast: ForecastData | null;
  currentLocation: Location | null;
  favoriteLocations: Location[];
  searchHistory: Location[];
  weatherAlerts: WeatherAlert[];
  isLoading: boolean;
  error: string | null;
  unit: 'metric' | 'imperial';
  theme: 'light' | 'dark';
}

export interface WeatherActions {
  setCurrentWeather: (weather: CurrentWeather) => void;
  setForecast: (forecast: ForecastData) => void;
  setCurrentLocation: (location: Location) => void;
  addFavoriteLocation: (location: Location) => void;
  removeFavoriteLocation: (locationId: string) => void;
  addToSearchHistory: (location: Location) => void;
  clearSearchHistory: () => void;
  setWeatherAlerts: (alerts: WeatherAlert[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUnit: (unit: 'metric' | 'imperial') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  fetchWeatherData: (lat: number, lon: number) => Promise<void>;
  fetchForecastData: (lat: number, lon: number) => Promise<void>;
  searchLocation: (query: string) => Promise<Location[]>;
  getCurrentLocation: () => Promise<void>;
}

export interface MapMarker {
  id: string;
  position: [number, number];
  weather: CurrentWeather;
  isActive: boolean;
}
