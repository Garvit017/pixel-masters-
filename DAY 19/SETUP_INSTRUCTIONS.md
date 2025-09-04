# Setup Instructions for Social Media Dashboard

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
   cd day19
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
   The application will be available at `http://localhost:3001`

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
- **User Profiles**: Complete profile system with avatars, bios, and verification
- **Posts System**: Create, edit, delete, and interact with posts
- **Comments**: Nested comment system with likes and replies
- **Like System**: Like/unlike posts and comments with real-time updates
- **Follow System**: Follow/unfollow users with follower tracking
- **Notifications**: Real-time notifications for all interactions
- **Search**: Search users, posts, and hashtags
- **Trending**: Discover trending posts and topics
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Data persistence across browser sessions

### 🎯 Key Components
- **Dashboard**: Main interface with feed, notifications, and trending
- **User Profile**: Complete user profile with stats and editing
- **Post Creation**: Rich post creation with hashtag support
- **Feed**: Personalized feed showing posts from followed users
- **Notifications**: Real-time notification center
- **Search**: Advanced search functionality
- **Sidebar**: Navigation with trending topics and suggested users

### 🚀 Getting Started
1. The app loads with sample data and users
2. You're automatically logged in as the first user
3. Try creating a new post with hashtags
4. Follow other users to see their posts in your feed
5. Like and comment on posts to see notifications
6. Use the search to find users and content
7. Check the trending section for popular posts

## Features to Try

### 📝 Creating Content
- Click "What's on your mind?" to create a new post
- Add hashtags using # (e.g., #coding #react)
- Use the expanded view for more options
- Posts appear instantly in your feed

### 👥 Social Interactions
- Click "Follow" on user profiles
- Like posts by clicking the heart icon
- Add comments to posts
- Reply to comments for nested discussions
- Share posts (UI ready)

### 🔍 Discovery
- Use the search bar to find users and posts
- Check trending topics in the sidebar
- Browse trending posts for popular content
- Explore suggested users to follow

### 🔔 Notifications
- Click the notifications tab to see all activity
- Get notified of likes, comments, and follows
- Mark notifications as read
- See real-time updates

### 👤 Profile Management
- Click on your profile to edit information
- Update your bio, location, and website
- See your follower and following counts
- View your post history

## Troubleshooting

### Common Issues
1. **Port already in use**: If port 3001 is busy, Vite will automatically use the next available port
2. **Dependencies not installing**: Try clearing npm cache: `npm cache clean --force`
3. **TypeScript errors**: Make sure all dependencies are properly installed
4. **Styling issues**: Ensure Tailwind CSS is properly configured

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

---

**Enjoy your new social media platform! 🎉**
