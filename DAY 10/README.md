# Styled Product Card List

A showcase of different styling approaches in React, featuring Tailwind CSS, CSS Modules, and examples of Styled Components.

## Overview

This project demonstrates how to create a responsive product card list using different styling methodologies in React. It serves as a practical example of component-based styling and modern CSS approaches.

## Features

- Responsive product card grid layout
- Interactive product cards with hover effects
- Search and filter functionality
- Category filtering
- Sort options (price, rating)
- Dark mode support
- Multiple styling approaches demonstrated

## Styling Approaches Demonstrated

1. **Tailwind CSS**: Utility-first CSS framework
2. **CSS Modules**: Component-scoped CSS
3. **Styled Components**: CSS-in-JS (example implementation)

See the [STYLING_APPROACHES.md](./STYLING_APPROACHES.md) file for detailed explanations of each approach.

## Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── ProductCard.jsx              # Tailwind CSS implementation
│   │   ├── ProductCardStyled.jsx        # CSS Modules implementation
│   │   ├── ProductCardStyled.module.css # CSS Module styles
│   │   ├── ProductCardStyled.jsx.example # Styled Components example
│   │   └── ProductList.jsx              # Product listing component
│   ├── data/
│   │   └── products.js   # Sample product data
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles with Tailwind directives
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── STYLING_APPROACHES.md # Documentation on styling approaches
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## Key Concepts

### Tailwind CSS

Tailwind CSS is used for the main implementation of the product card. Key features:

- Utility classes for rapid development
- Responsive design with breakpoint prefixes
- Dark mode with `dark:` variant
- Custom theme extensions in `tailwind.config.js`

### CSS Modules

CSS Modules are demonstrated in the alternative implementation. Key features:

- Scoped CSS classes
- Traditional CSS syntax
- Component-specific styling
- No class name conflicts

### Styled Components (Example)

An example implementation using Styled Components is provided to show how the same component could be built with CSS-in-JS.

## Customization

### Tailwind Theme

The Tailwind theme can be customized in the `tailwind.config.js` file. The current configuration includes:

- Custom color palette with primary colors
- Custom box shadows
- Extended theme properties

## Learning Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Styled Components Documentation](https://styled-components.com/docs)

## Next Steps

- Add more styling approaches (Emotion, Vanilla Extract, etc.)
- Implement theme switching
- Add animations and transitions
- Create a comparison benchmark for performance