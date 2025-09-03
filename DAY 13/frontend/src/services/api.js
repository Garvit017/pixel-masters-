import axios from 'axios';

const API_URL = '/api/notes';

// Get all notes with optional search and category filters
export const getNotes = async (searchTerm = '', categoryFilter = '') => {
  try {
    let url = API_URL;
    const params = {};
    
    if (searchTerm) params.search = searchTerm;
    if (categoryFilter) params.category = categoryFilter;
    
    const response = await axios.get(url, { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Get a single note by ID
export const getNote = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching note ${id}:`, error);
    throw error;
  }
};

// Create a new note
export const createNote = async (noteData) => {
  try {
    const response = await axios.post(API_URL, noteData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, noteData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};

// Toggle note completion status
export const toggleNoteComplete = async (id, completed) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { completed });
    return response.data.data;
  } catch (error) {
    console.error(`Error toggling note ${id} completion:`, error);
    throw error;
  }
};