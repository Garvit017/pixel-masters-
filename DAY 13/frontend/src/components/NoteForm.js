import React, { useState, useEffect } from 'react';
import '../styles/NoteForm.css';

const NoteForm = ({ createNote, updateNote, currentNote, setCurrentNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');
  
  // Categories and priorities for dropdown options
  const categories = ['General', 'Work', 'Personal', 'Study'];
  const priorities = ['Low', 'Medium', 'High'];
  
  // Reset form or populate with current note data
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setCategory(currentNote.category);
      setPriority(currentNote.priority);
    } else {
      resetForm();
    }
  }, [currentNote]);
  
  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('General');
    setPriority('Medium');
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const noteData = {
      title,
      content,
      category,
      priority
    };
    
    let success;
    
    if (currentNote) {
      success = await updateNote(currentNote._id, noteData);
    } else {
      success = await createNote(noteData);
    }
    
    if (success) {
      resetForm();
      setCurrentNote(null);
    }
  };
  
  // Cancel editing
  const handleCancel = () => {
    resetForm();
    setCurrentNote(null);
  };
  
  return (
    <div className="note-form">
      <h2>{currentNote ? 'Edit Note' : 'Add New Note'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            rows="6"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map(pri => (
                <option key={pri} value={pri}>{pri}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          {currentNote && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {currentNote ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;