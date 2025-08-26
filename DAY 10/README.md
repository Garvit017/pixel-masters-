# Day 10: Styled Product Cards with Tailwind CSS

This project demonstrates component-based styling using Tailwind CSS to create a responsive product card list.

## Features

- Responsive design using Tailwind CSS breakpoints
- Component-based architecture
- Product card component with detailed styling
- Product list with category filtering
- Custom color theme configuration
- Responsive layout for various screen sizes

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   ├── data/
│   │   └── products.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Styling Approach

### Tailwind CSS Configuration

The project uses a custom Tailwind CSS configuration with:

- Extended color palette for primary and secondary colors
- Custom box shadows for cards
- Responsive breakpoints for different screen sizes

### Component-Based Styling

- **ProductCard**: A reusable card component with responsive design
- **ProductList**: A grid layout that adapts to different screen sizes

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open the browser at the URL shown in the terminal

## Responsive Design Implementation

The project implements responsive design using Tailwind's utility classes:

- Mobile-first approach with progressive enhancement
- Breakpoint-specific classes (sm:, md:, lg:, xl:)
- Fluid typography and spacing
- Responsive grid layouts
- Adaptive component sizing