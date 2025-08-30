import React, { useState } from 'react'
import './TextPreview.css'

function TextPreview() {
  // State for the input text
  const [text, setText] = useState('')
  
  // State for text formatting options
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [textColor, setTextColor] = useState('#000000')
  
  // Handle input change
  const handleTextChange = (e) => {
    setText(e.target.value)
  }
  
  // Toggle bold formatting
  const toggleBold = () => {
    setIsBold(!isBold)
  }
  
  // Toggle italic formatting
  const toggleItalic = () => {
    setIsItalic(!isItalic)
  }
  
  // Handle color change
  const handleColorChange = (e) => {
    setTextColor(e.target.value)
  }
  
  // Clear all text and formatting
  const clearAll = () => {
    setText('')
    setIsBold(false)
    setIsItalic(false)
    setTextColor('#000000')
  }
  
  // Dynamic styles for the preview text
  const previewStyle = {
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    color: textColor
  }
  
  return (
    <div className="text-preview">
      <div className="input-section">
        <textarea 
          value={text} 
          onChange={handleTextChange} 
          placeholder="Type something here..."
          rows="4"
        />
        
        <div className="formatting-controls">
          <button 
            className={`format-btn ${isBold ? 'active' : ''}`} 
            onClick={toggleBold}
            title="Bold"
          >
            B
          </button>
          
          <button 
            className={`format-btn ${isItalic ? 'active' : ''}`} 
            onClick={toggleItalic}
            title="Italic"
          >
            I
          </button>
          
          <div className="color-picker">
            <input 
              type="color" 
              value={textColor} 
              onChange={handleColorChange} 
              title="Text Color"
            />
          </div>
          
          <button 
            className="clear-btn" 
            onClick={clearAll}
            title="Clear All"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="preview-section">
        <h3>Live Preview:</h3>
        <div className="preview-content" style={previewStyle}>
          {text || 'Your text will appear here...'}
        </div>
      </div>
      
      <div className="explanation">
        <p>
          This component demonstrates handling form inputs with <code>useState</code>. 
          The <code>setText</code> function updates the state when the input changes.
        </p>
        <p>
          We also use multiple state variables to track formatting options (bold, italic, color).
          The preview updates in real-time as you type and change formatting options.
        </p>
      </div>
    </div>
  )
}

export default TextPreview