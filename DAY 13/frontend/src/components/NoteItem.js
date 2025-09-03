import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import '../styles/NoteItem.css';

const NoteItem = ({ note, deleteNote, setCurrentNote, toggleComplete }) => {
  const { _id, title, content, category, priority, completed, createdAt } = note;
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get priority class for styling
  const getPriorityClass = () => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };
  
  return (
    <div className={`note-item ${completed ? 'completed' : ''}`}>
      <div className="note-header">
        <h3 className="note-title">{title}</h3>
        <div className="note-actions">
          <button 
            className="action-btn toggle-btn"
            onClick={() => toggleComplete(_id, !completed)}
            title={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {completed ? <FaUndo /> : <FaCheck />}
          </button>
          <button 
            className="action-btn edit-btn"
            onClick={() => setCurrentNote(note)}
            title="Edit note"
          >
            <FaEdit />
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={() => deleteNote(_id)}
            title="Delete note"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="note-content">
        <p>{content}</p>
      </div>
      
      <div className="note-footer">
        <div className="note-meta">
          <span className="note-category">{category}</span>
          <span className={`note-priority ${getPriorityClass()}`}>{priority}</span>
        </div>
        <div className="note-date">
          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;