# React State Management Examples

## Overview

This project demonstrates React state management concepts using the `useState` hook and form input handling. It includes two main examples:

1. **Counter Component**: Demonstrates basic state management with `useState`
2. **Live Text Preview**: Shows how to handle form inputs and maintain multiple state variables

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Counter.jsx
│   │   ├── Counter.css
│   │   ├── TextPreview.jsx
│   │   └── TextPreview.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## State Management Concepts

### useState Hook

The `useState` hook is a function that lets you add React state to functional components. It returns a pair: the current state value and a function to update it.

```jsx
const [count, setCount] = useState(0);
```

- `count` is the current state value
- `setCount` is the function to update the state
- `0` is the initial state value

### Functional Updates

When the new state depends on the previous state, it's recommended to use the functional update form:

```jsx
setCount(prevCount => prevCount + 1);
```

This ensures you're always working with the most current state value.

### Form Input Handling

For form inputs, we use the `onChange` event handler to update state:

```jsx
const [text, setText] = useState('');

const handleTextChange = (e) => {
  setText(e.target.value);
};

<input value={text} onChange={handleTextChange} />
```

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

## Learning Resources

- [React Official Documentation on Hooks](https://reactjs.org/docs/hooks-intro.html)
- [useState Hook Documentation](https://reactjs.org/docs/hooks-state.html)
- [Forms in React](https://reactjs.org/docs/forms.html)