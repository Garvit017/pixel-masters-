# Profile Card Component - React App

## Overview

This project demonstrates a React application featuring a reusable ProfileCard component. The application displays multiple profile cards with different user information.

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileCard.css
│   │   ├── ProfileCard.test.jsx
│   │   └── ProfileCard.md
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features

- Reusable ProfileCard component with props
- Responsive design for different screen sizes
- Sample profile data display
- Clean, modern UI with hover effects
- Social media links integration

## Component Props

The ProfileCard component accepts the following props:

- `name`: User's full name
- `role`: User's job title or role
- `bio`: Short biography or description
- `avatar`: URL to profile image
- `social`: Object containing social media handles (twitter, github, linkedin)

## Running the Project

To run this project locally (if npm is available):

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser to the URL displayed in the terminal (typically http://localhost:5173)

## Learning Concepts

This project demonstrates several key React concepts:

- Creating functional components
- Using JSX syntax
- Passing and using props
- Component styling with CSS
- Responsive design principles
- Component documentation

## Credits

Profile images from [Random User Generator](https://randomuser.me/)