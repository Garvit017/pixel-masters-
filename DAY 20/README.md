# Weather Forecast App with Interactive Maps

A comprehensive weather forecast application featuring interactive maps, geolocation services, and real-time weather data. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### 🌤️ Weather Information
- **Current Weather**: Real-time weather conditions with detailed metrics
- **5-Day Forecast**: Extended weather predictions with hourly breakdowns
- **Weather Alerts**: Critical weather warnings and notifications
- **Multiple Units**: Support for both metric and imperial units
- **Weather Icons**: Beautiful weather icons and animations

### 🗺️ Interactive Maps
- **Leaflet Integration**: Interactive maps with weather overlays
- **Weather Markers**: Custom markers showing temperature and conditions
- **Location Search**: Find weather for any location worldwide
- **Fullscreen Maps**: Immersive map viewing experience
- **Geolocation**: Automatic location detection

### 📍 Location Management
- **Location Search**: Search for cities worldwide
- **Favorite Locations**: Save frequently accessed locations
- **Search History**: Quick access to recently searched locations
- **Current Location**: Automatic detection using GPS
- **Location Switching**: Easy switching between saved locations

### 🎨 User Experience
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: Beautiful transitions and effects
- **Loading States**: Elegant loading indicators
- **Error Handling**: Graceful error management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd day20
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3002` to view the application.

### Build for Production

```bash
npm run build
```

## 🎯 Usage Guide

### Getting Started
1. **Allow Location Access**: Grant permission for automatic location detection
2. **Explore Current Weather**: View detailed weather information for your location
3. **Search Locations**: Use the search bar to find weather for other cities
4. **View Forecast**: Check the 5-day weather forecast
5. **Interactive Maps**: Explore weather on interactive maps

### Key Features
- **Search**: Type city names to find weather information
- **Favorites**: Click the heart icon to save locations
- **Units**: Toggle between Celsius and Fahrenheit
- **Themes**: Switch between light and dark modes
- **Refresh**: Update weather data manually
- **Maps**: View weather conditions on interactive maps

### Navigation
- **Overview Tab**: Current weather, map, and alerts
- **Forecast Tab**: 5-day and hourly weather predictions
- **Map Tab**: Fullscreen interactive weather map
- **Alerts Tab**: Weather warnings and notifications

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Zustand**: Lightweight state management
- **React Leaflet**: Interactive maps with Leaflet.js
- **Axios**: HTTP client for API requests

### API Integration
- **OpenWeatherMap API**: Weather data and forecasts
- **Geocoding API**: Location search and coordinates
- **Geolocation API**: Browser location services
- **Mock Data**: Demo data for development and testing

### State Management
```typescript
interface WeatherState {
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
```

## 📁 Project Structure

```
day20/
├── src/
│   ├── components/          # React components
│   │   ├── WeatherDashboard.tsx    # Main dashboard
│   │   ├── CurrentWeather.tsx      # Current weather display
│   │   ├── WeatherForecast.tsx     # Forecast display
│   │   ├── WeatherMap.tsx          # Interactive maps
│   │   ├── LocationSearch.tsx      # Location search
│   │   ├── FavoriteLocations.tsx   # Favorite locations
│   │   └── WeatherAlerts.tsx       # Weather alerts
│   ├── store/              # State management
│   │   └── useWeatherStore.ts      # Zustand store
│   ├── services/           # API services
│   │   └── weatherApi.ts           # Weather API integration
│   ├── types/              # TypeScript definitions
│   │   └── index.ts                # Type definitions
│   ├── data/               # Mock data
│   │   └── mockData.ts             # Sample data
│   ├── App.tsx             # Main app component
│   ├── App.css             # Custom styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🎨 Customization

### API Configuration
To use real weather data, update the API key in `src/services/weatherApi.ts`:

```typescript
const API_KEY = 'your_openweathermap_api_key';
```

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api).

### Styling
- **Colors**: Update the color palette in `tailwind.config.js`
- **Animations**: Modify CSS animations in `App.css`
- **Layout**: Adjust responsive breakpoints and spacing
- **Components**: Customize individual component styles

### Features
- **Add New Weather Sources**: Integrate additional weather APIs
- **Custom Themes**: Create new color schemes
- **Additional Maps**: Add different map providers
- **Weather Widgets**: Create custom weather displays

## 📱 Responsive Design

The application is fully responsive and works seamlessly across all devices:

- **Desktop**: Full sidebar navigation with rich features
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Touch-friendly interface with bottom navigation

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for code quality

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📊 Performance Features

- **Lazy Loading**: Components load on demand
- **Caching**: Weather data cached for better performance
- **Optimistic Updates**: Immediate UI feedback
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Optimized bundle sizes

## 🔒 Privacy & Security

- **Local Storage**: Data stored locally on device
- **No Tracking**: No user data collection
- **HTTPS**: Secure API communications
- **Permission-Based**: Location access only when requested

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **OpenWeatherMap**: Weather data API
- **Leaflet**: Interactive maps library
- **React Leaflet**: React integration for Leaflet
- **Lucide React**: Beautiful icon library
- **Tailwind CSS**: Utility-first CSS framework

## 🔮 Future Enhancements

- **Weather Widgets**: Customizable weather widgets
- **Push Notifications**: Weather alert notifications
- **Weather History**: Historical weather data
- **Social Features**: Share weather information
- **Offline Support**: Work without internet connection
- **Weather Cameras**: Live weather camera feeds
- **Air Quality**: Air quality index integration
- **UV Index**: UV radiation information

---

**Stay informed about the weather with our comprehensive forecast app! 🌤️**
