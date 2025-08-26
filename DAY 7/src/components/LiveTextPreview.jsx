import React, { useState } from 'react';
import './LiveTextPreview.css';

const LiveTextPreview = () => {
  // Initialize state for the input text
  const [inputText, setInputText] = useState('');
  
  // Handle input changes
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Clear the input text
  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="live-preview-container">
      <h2>Live Text Preview</h2>
      
      <div className="input-section">
        <textarea 
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type something here..."
          rows="4"
        />
        <button onClick={handleClear}>Clear</button>
      </div>
      
      <div className="preview-section">
        <h3>Preview:</h3>
        <div className="preview-content">
          {inputText ? inputText : <span className="placeholder-text">Your text will appear here...</span>}
        </div>
      </div>
      
      <div className="stats-section">
        <p>Character Count: {inputText.length}</p>
        <p>Word Count: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</p>
      </div>
    </div>
  );
};

export default LiveTextPreview;