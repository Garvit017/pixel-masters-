const express = require('express');
const router = express.Router();
const { 
  getNotes, 
  getNote, 
  createNote, 
  updateNote, 
  deleteNote 
} = require('../controllers/noteController');

// Routes for /api/notes
router.route('/')
  .get(getNotes)
  .post(createNote);

// Routes for /api/notes/:id
router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;