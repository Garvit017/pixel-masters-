import React, { useState, useEffect } from 'react';
import * as api from './services/api';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import Spinner from './components/Spinner';
import Message from './components/Message';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Fetch notes when component mounts or when search/filter changes
  useEffect(() => {
    fetchNotes();
  }, [searchTerm, categoryFilter]);
  
  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await api.getNotes(searchTerm, categoryFilter);
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes. Please try again later.');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new note
  const createNote = async (note) => {
    try {
      setLoading(true);
      const newNote = await api.createNote(note);
      setNotes([newNote, ...notes]);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to create note. Please try again.');
      console.error('Error creating note:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing note
  const updateNote = async (id, note) => {
    try {
      setLoading(true);
      const updatedNote = await api.updateNote(id, note);
      setNotes(notes.map(note => note._id === id ? updatedNote : note));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update note. Please try again.');
      console.error('Error updating note:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a note
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await api.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle note completion status
  const toggleComplete = async (id, completed) => {
    try {
      setLoading(true);
      const updatedNote = await api.toggleNoteComplete(id, completed);
      setNotes(notes.map(note => note._id === id ? updatedNote : note));
      setError(null);
    } catch (err) {
      setError('Failed to update note status. Please try again.');
      console.error('Error updating note status:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="app">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      
      <div className="container">
        {error && <Message message={error} />}
        
        <div className="notes-container">
          <div className="form-container">
            <NoteForm 
              createNote={createNote}
              updateNote={updateNote}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
            />
          </div>
          
          <div className="list-container">
            {loading ? (
              <div className="loading">
                <Spinner />
              </div>
            ) : (
              <NotesList 
                notes={notes}
                deleteNote={deleteNote}
                setCurrentNote={setCurrentNote}
                toggleComplete={toggleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  
  // Delete a note
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await api.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle pin status
  const togglePin = async (id, isPinned) => {
    try {
      const updated = await api.togglePinStatus(id, isPinned);
      setNotes(notes.map(note => note._id === id ? updated : note));
      return true;
    } catch (err) {
      setError('Failed to update note. Please try again.');
      console.error('Error updating note:', err);
      return false;
    }
  };
  
  // Set current note for editing
  const editNote = (note) => {
    setCurrentNote(note);
  };
  
  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  // Handle category filter
  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };
  
  // Fetch notes on component mount and when filters change
  useEffect(() => {
    fetchNotes();
  }, [searchTerm, categoryFilter]);
  
  return (
    <div className="app">
      <Header 
        onSearch={handleSearch} 
        onCategoryFilter={handleCategoryFilter}
        categoryFilter={categoryFilter}
      />
      
      <div className="container">
        {error && <Message variant="danger" message={error} />}
        
        <div className="notes-container">
          <div className="form-container">
            <NoteForm 
              createNote={createNote} 
              updateNote={updateNote}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
            />
          </div>
          
          <div className="list-container">
            {loading && !notes.length ? (
              <Spinner />
            ) : notes.length > 0 ? (
              <NotesList 
                notes={notes} 
                onDelete={deleteNote} 
                onEdit={editNote} 
                onTogglePin={togglePin}
              />
            ) : (
              <Message 
                variant="info" 
                message={searchTerm || categoryFilter ? "No matching notes found" : "No notes yet. Create one!"} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;