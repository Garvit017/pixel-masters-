# Setup Instructions for Developer Portfolio

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
   cd day21
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
   The application will be available at `http://localhost:3003`

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
- **Hero Section**: Eye-catching introduction with animated elements and personal branding
- **About Section**: Personal story, skills with progress bars, and experience timeline
- **Projects Showcase**: Featured projects with filtering, categories, and detailed modal views
- **Contact Form**: Functional contact form with validation and email integration ready
- **Navigation**: Smooth scrolling navigation with active states and mobile menu
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Animations**: Smooth Framer Motion animations throughout the site
- **Modern UI**: Beautiful gradients, glass morphism effects, and professional design

### 🎯 Key Components
- **Hero**: Animated introduction with social links and call-to-action buttons
- **About**: Skills showcase, experience timeline, and personal information
- **Projects**: Project grid with filtering, featured projects, and detailed modals
- **Contact**: Contact form with validation and contact information
- **Navigation**: Responsive navigation with smooth scrolling
- **Footer**: Social links and additional information

### 🚀 Getting Started
1. The portfolio loads with sample data for John Doe
2. Navigate through different sections using the navigation menu
3. View featured projects in the hero section
4. Filter projects by category in the projects section
5. Click on projects to see detailed information in modals
6. Try the contact form (currently shows success message)
7. Test responsive design by resizing your browser window

## Customization Guide

### 📝 Personal Information
To customize the portfolio with your information:

1. **Open** `src/data/portfolioData.ts`
2. **Update** the `personalInfo` object:
   ```typescript
   export const personalInfo: PersonalInfo = {
     name: 'Your Name',
     title: 'Your Title',
     bio: 'Your bio...',
     location: 'Your Location',
     email: 'your.email@example.com',
     phone: '+1 (555) 123-4567',
     github: 'https://github.com/yourusername',
     linkedin: 'https://linkedin.com/in/yourusername',
     // ... other fields
   };
   ```

### 🎨 Projects
Add your projects to the `projects` array:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project Name',
    description: 'Brief project description',
    longDescription: 'Detailed project description...',
    image: 'https://your-image-url.com/image.jpg',
    technologies: ['React', 'Node.js', 'TypeScript'],
    category: 'web',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/yourusername/project',
    liveUrl: 'https://your-project.com',
    // ... other fields
  },
];
```

### 🛠️ Skills
Update your skills in the `skills` array:

```typescript
export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend', level: 'expert', icon: '⚛️' },
  { id: '2', name: 'TypeScript', category: 'frontend', level: 'advanced', icon: '📘' },
  // ... more skills
];
```

### 💼 Experience
Add your work experience:

```typescript
export const experience: Experience[] = [
  {
    company: 'Your Company',
    position: 'Your Position',
    location: 'City, Country',
    startDate: new Date('2023-01-01'),
    current: true,
    description: 'Job description...',
    achievements: ['Achievement 1', 'Achievement 2'],
    technologies: ['React', 'Node.js'],
    type: 'full-time'
  },
];
```

### 🎓 Education
Add your education:

```typescript
export const education: Education[] = [
  {
    institution: 'Your University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: new Date('2019-09-01'),
    endDate: new Date('2023-05-31'),
    gpa: '3.8/4.0',
  },
];
```

## Styling Customization

### 🎨 Colors
Change the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color', // Main brand color
    600: '#your-darker-color',
  },
  secondary: {
    500: '#your-secondary-color',
    600: '#your-secondary-darker',
  },
}
```

### 🔤 Fonts
Change fonts in `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
  mono: ['Your Mono Font', 'monospace'],
}
```

## Features to Try

### 🎭 Animations
- Scroll through the page to see fade-in animations
- Hover over project cards to see scale effects
- Click navigation items to see smooth scrolling
- View the floating background elements in the hero section

### 📱 Responsive Design
- Resize your browser window to see responsive layouts
- Test the mobile navigation menu on smaller screens
- Check how the project grid adapts to different screen sizes
- Verify that all animations work on mobile devices

### 🔍 Project Showcase
- Filter projects by category (All, Web Apps, Mobile Apps, etc.)
- Click on project cards to see detailed information
- View featured projects in the hero section
- Check project links (GitHub, Live Demo) in the modals

### 📧 Contact Form
- Fill out the contact form to see validation
- Try submitting with missing fields to see error messages
- Submit a complete form to see success message
- Check form validation for email format

## Troubleshooting

### Common Issues
1. **Port already in use**: If port 3003 is busy, Vite will automatically use the next available port
2. **Dependencies not installing**: Try clearing npm cache: `npm cache clean --force`
3. **TypeScript errors**: Make sure all dependencies are properly installed
4. **Images not loading**: Check that image URLs in portfolioData.ts are valid
5. **Animations not working**: Ensure Framer Motion is properly installed

### Development Tips
- Use `Ctrl+C` to stop the development server
- The app supports hot reloading - changes will appear automatically
- Check the browser console for any error messages
- Use React Developer Tools for debugging
- All data is stored in the portfolioData.ts file

## Production Build
To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder and can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Notes
- The app uses Framer Motion for smooth animations
- Images are optimized for web performance
- Code is split for faster loading
- Responsive design ensures smooth mobile experience
- All animations respect user's motion preferences

## Security Notes
- Form validation prevents malicious inputs
- No sensitive data is stored in the client
- All external links open in new tabs
- Contact form is ready for backend integration

---

**Start building your professional portfolio today! 🚀**
