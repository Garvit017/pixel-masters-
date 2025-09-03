import React from 'react';
import '../styles/Header.css';

const Header = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }) => {
  const categories = ['All', 'General', 'Work', 'Personal', 'Study'];
  
  return (
    <header className="header">
      <div className="header-container">
        <h1>Notes App</h1>
        
        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;