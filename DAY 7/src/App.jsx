import React from 'react';
import Counter from './components/Counter';
import LiveTextPreview from './components/LiveTextPreview';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>React State Management</h1>
      <div className="components-container">
        <Counter />
        <LiveTextPreview />
      </div>
    </div>
  );
}

export default App;