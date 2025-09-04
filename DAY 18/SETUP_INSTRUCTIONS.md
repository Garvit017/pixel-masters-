# Setup Instructions for Trello Clone

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
   cd day18
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
   The application will be available at `http://localhost:3000`

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
- **Drag & Drop**: Full drag and drop functionality for cards and columns
- **Team Collaboration**: User assignments, comments, and member management
- **Progress Tracking**: Comprehensive statistics dashboard with analytics
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Local Storage**: Data persistence across browser sessions
- **TypeScript**: Full type safety and better development experience

### 🎯 Key Components
- **Board**: Main container with columns and cards
- **Column**: Draggable columns with customizable colors
- **Card**: Rich cards with descriptions, due dates, priorities, and comments
- **Statistics**: Analytics dashboard with progress tracking
- **Modals**: Add/edit forms for cards and columns

### 🚀 Getting Started
1. The app loads with sample data
2. Try dragging cards between columns
3. Click on cards to view details and add comments
4. Click "Add a column" to create new workflow stages
5. Click "Stats" to view board analytics
6. All changes are automatically saved to local storage

## Troubleshooting

### Common Issues
1. **Port already in use**: If port 3000 is busy, Vite will automatically use the next available port
2. **Dependencies not installing**: Try clearing npm cache: `npm cache clean --force`
3. **TypeScript errors**: Make sure all dependencies are properly installed

### Development Tips
- Use `Ctrl+C` to stop the development server
- The app supports hot reloading - changes will appear automatically
- Check the browser console for any error messages
- Use React Developer Tools for debugging

## Production Build
To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder and can be deployed to any static hosting service.

---

**Enjoy your new Trello-like project management tool! 🎉**
