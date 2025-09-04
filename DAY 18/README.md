# Trello Clone - Project Management Tool

A modern, feature-rich project management application inspired by Trello, built with React, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Drag & Drop**: Intuitive card and column management with smooth animations
- **Team Collaboration**: User assignments, comments, and real-time updates
- **Progress Tracking**: Comprehensive statistics and analytics dashboard
- **Local Storage**: Data persistence across browser sessions

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with beautiful animations
- **Customizable**: Color-coded columns and priority indicators
- **Mobile Friendly**: Responsive design that works on all devices
- **Accessibility**: Keyboard navigation and screen reader support

### 📊 Analytics & Insights
- **Board Statistics**: Real-time metrics and completion rates
- **Priority Distribution**: Visual breakdown of task priorities
- **Team Overview**: Member activity and assignment tracking
- **Progress Visualization**: Interactive charts and progress bars

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

## Usage

### Creating Your First Board

1. **Add Columns**: Click "Add a column" to create new workflow stages
2. **Add Cards**: Click "Add a card" within any column to create tasks
3. **Drag & Drop**: Move cards between columns to update their status
4. **Edit Content**: Click on card titles or descriptions to edit them inline

### Managing Tasks

- **Set Priorities**: Use the priority indicators (High, Medium, Low)
- **Assign Members**: Add team members to cards for collaboration
- **Add Comments**: Leave feedback and updates on specific cards
- **Set Due Dates**: Track deadlines with visual indicators
- **Add Labels**: Categorize cards with custom labels

### Team Collaboration

- **Member Avatars**: See who's working on what at a glance
- **Comment System**: Real-time communication on cards
- **Assignment Tracking**: Monitor workload distribution
- **Activity History**: Track changes and updates

### Analytics Dashboard

- **View Statistics**: Click the "Stats" button to see board analytics
- **Progress Tracking**: Monitor completion rates and overdue tasks
- **Team Insights**: Understand team productivity and workload
- **Priority Analysis**: Balance high-priority vs. low-priority work

## Technical Features

### Architecture
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **Context API**: Centralized state management
- **React Beautiful DnD**: Smooth drag and drop functionality

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Prepared for theme switching

### Data Management
- **Local Storage**: Automatic data persistence
- **Type Safety**: Comprehensive TypeScript interfaces
- **State Management**: Reducer pattern for predictable updates
- **Data Validation**: Input validation and error handling

## Project Structure

```
day18/
├── src/
│   ├── components/          # React components
│   │   ├── Board.tsx       # Main board component
│   │   ├── Column.tsx      # Column component
│   │   ├── Card.tsx        # Card component
│   │   ├── BoardStats.tsx  # Analytics dashboard
│   │   └── AddColumnModal.tsx
│   ├── context/            # React context
│   │   └── BoardContext.tsx
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   ├── data/               # Mock data
│   │   └── mockData.ts
│   ├── utils/              # Utility functions
│   │   └── storage.ts
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

## Customization

### Adding New Features

1. **New Card Fields**: Extend the `Card` interface in `types/index.ts`
2. **Custom Themes**: Modify `tailwind.config.js` for color schemes
3. **Additional Analytics**: Add new metrics to `BoardStats.tsx`
4. **Integration**: Connect to external APIs in `utils/` directory

### Styling

- **Colors**: Update the color palette in `tailwind.config.js`
- **Animations**: Modify CSS animations in `App.css`
- **Layout**: Adjust responsive breakpoints and spacing
- **Components**: Customize individual component styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by Trello's intuitive design
- Built with modern web technologies
- Designed for productivity and collaboration
- Optimized for performance and accessibility

---

**Happy Project Managing! 🚀**
