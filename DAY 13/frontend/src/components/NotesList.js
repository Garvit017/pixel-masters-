import React from 'react';
import NoteItem from './NoteItem';
import '../styles/NotesList.css';

const NotesList = ({ notes, deleteNote, setCurrentNote, toggleComplete }) => {
  if (notes.length === 0) {
    return (
      <div className="notes-list empty-list">
        <p>No notes found. Create a new note to get started!</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map(note => (
        <NoteItem
          key={note._id}
          note={note}
          deleteNote={deleteNote}
          setCurrentNote={setCurrentNote}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default NotesList;