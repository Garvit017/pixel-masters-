import React from 'react';
import { BoardProvider } from './context/BoardContext';
import { Board } from './components/Board';
import './App.css';

function App() {
  return (
    <BoardProvider>
      <div className="App">
        <Board />
      </div>
    </BoardProvider>
  );
}

export default App;
