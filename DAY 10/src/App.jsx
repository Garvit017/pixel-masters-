import { useState } from 'react'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Styled Product Card List
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          A showcase of Tailwind CSS and component-based styling
        </p>
      </header>
      <main className="max-w-6xl mx-auto">
        <ProductList />
      </main>
    </div>
  )
}

export default App