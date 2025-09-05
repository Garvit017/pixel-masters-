# Setup Instructions for Weather Forecast App

## Prerequisites
Before running this project, you need to have Node.js installed on your system.

### Installing Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version for Windows
3. Run the installer and follow the setup wizard
4. Restart your command prompt/PowerShell

### Verify Installation
Open a new command prompt/PowerShell and run:
```bash
node --version
npm --version
```

## Running the Project

1. **Navigate to the project directory**
   ```bash
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
   The application will be available at `http://localhost:3002`

## Alternative: Using Yarn
If you prefer using Yarn instead of npm:

1. **Install Yarn** (if not already installed)
   ```bash
   npm install -g yarn
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

## Project Features

### ✅ Completed Features
- **Current Weather**: Real-time weather display with detailed metrics
- **5-Day Forecast**: Extended weather predictions with hourly breakdowns
- **Interactive Maps**: Leaflet-based maps with weather overlays
- **Location Search**: Search for cities worldwide with autocomplete
- **Favorite Locations**: Save and manage favorite locations
- **Search History**: Quick access to recently searched locations
- **Weather Alerts**: Critical weather warnings and notifications
- **Geolocation**: Automatic location detection using GPS
- **Unit Conversion**: Toggle between metric and imperial units
- **Theme Support**: Light and dark mode themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Data persistence across browser sessions

### 🎯 Key Components
- **Weather Dashboard**: Main interface with tabbed navigation
- **Current Weather**: Detailed current conditions with animations
- **Weather Forecast**: 5-day and hourly weather predictions
- **Interactive Maps**: Weather overlays on interactive maps
- **Location Search**: Advanced search with history and favorites
- **Weather Alerts**: Alert system with severity levels
- **Settings Panel**: Unit and theme preferences

### 🚀 Getting Started
1. The app loads with sample weather data
2. Allow location access when prompted for automatic detection
3. Use the search bar to find weather for other cities
4. Click the heart icon to save locations to favorites
5. Toggle between Celsius and Fahrenheit using the temperature button
6. Switch between light and dark themes
7. Explore the interactive map to see weather conditions
8. Check the alerts tab for weather warnings

## Features to Try

### 🌤️ Weather Information
- View current temperature, humidity, wind speed, and pressure
- Check the 5-day forecast with daily and hourly views
- See sunrise and sunset times
- View weather alerts and warnings
- Toggle between metric and imperial units

### 🗺️ Interactive Maps
- Click "View Full Map" for immersive map experience
- See weather markers with temperature and conditions
- Zoom and pan to explore different areas
- Click markers for detailed weather information

### 📍 Location Management
- Search for any city worldwide
- Add locations to favorites for quick access
- View search history for recently searched locations
- Use "Current Location" for automatic GPS detection
- Switch between saved locations easily

### 🎨 User Interface
- Toggle between light and dark themes
- Switch between Celsius and Fahrenheit
- Refresh weather data manually
- Navigate between different tabs (Overview, Forecast, Map, Alerts)
- Responsive design that works on all devices

## API Configuration

### Using Real Weather Data
To use real weather data instead of mock data:

1. **Get API Key**: Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. **Update Configuration**: Edit `src/services/weatherApi.ts`
3. **Replace API Key**: Change `const API_KEY = 'demo_key';` to your actual key
4. **Uncomment API Calls**: Remove the mock data fallbacks in the store

### API Endpoints Used
- **Current Weather**: `/weather` - Current weather conditions
- **5-Day Forecast**: `/forecast` - Weather predictions
- **Geocoding**: `/direct` - Location search
- **Reverse Geocoding**: `/reverse` - Coordinates to location

## Troubleshooting

### Common Issues
1. **Port already in use**: If port 3002 is busy, Vite will automatically use the next available port
2. **Dependencies not installing**: Try clearing npm cache: `npm cache clean --force`
3. **TypeScript errors**: Make sure all dependencies are properly installed
4. **Map not loading**: Check if Leaflet CSS is properly loaded in index.html
5. **Location not working**: Ensure HTTPS or localhost for geolocation API

### Development Tips
- Use `Ctrl+C` to stop the development server
- The app supports hot reloading - changes will appear automatically
- Check the browser console for any error messages
- Use React Developer Tools for debugging
- All data is stored in localStorage and persists across sessions

## Production Build
To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder and can be deployed to any static hosting service.

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Notes
- The app uses Zustand for efficient state management
- Local storage provides fast data persistence
- Optimistic updates give immediate feedback
- Responsive design ensures smooth mobile experience
- Maps are lazy-loaded for better performance

## Security Notes
- No user data is collected or transmitted
- All data is stored locally in the browser
- API keys should be kept secure (use environment variables in production)
- Location data is only used for weather information

---

**Enjoy your new weather forecast app! 🌤️**
