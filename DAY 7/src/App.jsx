import React from 'react'
import Counter from './components/Counter'
import TextPreview from './components/TextPreview'
import './App.css'

function App() {
  return (
    <div className="container">
      <h1>React State Management Examples</h1>
      
      <div className="section">
        <h2>Counter Example (useState)</h2>
        <Counter />
      </div>
      
      <div className="section">
        <h2>Live Text Preview (Input Handling)</h2>
        <TextPreview />
      </div>
    </div>
  )
}

export default App