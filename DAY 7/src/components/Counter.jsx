import React, { useState } from 'react'
import './Counter.css'

function Counter() {
  // Initialize state with useState hook
  const [count, setCount] = useState(0)
  
  // Functions to update state
  const increment = () => {
    setCount(count + 1)
  }
  
  const decrement = () => {
    setCount(count - 1)
  }
  
  const reset = () => {
    setCount(0)
  }
  
  // Using functional updates (recommended way when new state depends on previous state)
  const incrementBy5 = () => {
    // This pattern ensures we're always working with the latest state
    setCount(prevCount => prevCount + 5)
  }
  
  return (
    <div className="counter">
      <div className="counter-display">
        <h3>Current Count: <span className={count < 0 ? 'negative' : count > 0 ? 'positive' : ''}>{count}</span></h3>
      </div>
      
      <div className="counter-controls">
        <button onClick={decrement} className="btn btn-secondary">Decrement</button>
        <button onClick={reset} className="btn btn-danger">Reset</button>
        <button onClick={increment} className="btn btn-primary">Increment</button>
      </div>
      
      <div className="counter-advanced">
        <button onClick={incrementBy5} className="btn btn-success">Add 5 (Functional Update)</button>
      </div>
      
      <div className="counter-explanation">
        <p>
          This counter uses the <code>useState</code> hook to manage state. 
          The <code>setCount</code> function updates the state and triggers a re-render.
        </p>
        <p>
          For the "Add 5" button, we use a functional update pattern: <code>setCount(prevCount => prevCount + 5)</code> 
          which is the recommended approach when new state depends on previous state.
        </p>
      </div>
    </div>
  )
}

export default Counter