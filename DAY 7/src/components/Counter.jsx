import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  // Initialize state with useState hook
  const [count, setCount] = useState(0);

  // Functions to handle incrementing and decrementing the counter
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h2>Counter Component</h2>
      <p className="counter-value">Count: {count}</p>
      <div className="counter-buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;