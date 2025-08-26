const express = require('express');
const router = express.Router();
const { 
  getTodos, 
  createTodo, 
  deleteTodo,
  toggleTodo 
} = require('../controllers/todoController');

// Get all todos
router.get('/', getTodos);

// Create a new todo
router.post('/', createTodo);

// Delete a todo
router.delete('/:id', deleteTodo);

// Toggle todo completion status
router.put('/:id/toggle', toggleTodo);

module.exports = router;