import { useState } from 'react'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-4 sm:mb-6 md:mb-8">Styled Product Cards</h1>
      <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 md:mb-10">A showcase of Tailwind CSS styling for product cards</p>
      <ProductList />
    </div>
  )
}

export default App