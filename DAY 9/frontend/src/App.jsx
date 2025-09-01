import { useState } from 'react'
import StudentList from './components/StudentList'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Directory</h1>
        <p className="app-description">A demonstration of useEffect and Fetch API</p>
      </header>
      
      <main>
        <StudentList />
      </main>
      
      <footer className="app-footer">
        <p>DAY 9 - useEffect & Fetch API Demo</p>
      </footer>
    </div>
  )
}

export default App