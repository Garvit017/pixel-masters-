const express = require('express');
const Todo = require('../models/todoModel');

const router = express.Router();

// GET all todos (with optional filtering)
// GET /api/todos?completed=true&text=search
router.get('/todos', (req, res) => {
  try {
    const todos = Todo.getAll(req.query);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
});

// GET a single todo by ID
// GET /api/todos/:id
router.get('/todos/:id', (req, res) => {
  try {
    const todo = Todo.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error: error.message });
  }
});

// POST create a new todo
// POST /api/todos
router.post('/todos', (req, res) => {
  try {
    const { text } = req.body;
    
    // Validate input
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Todo text is required' });
    }
    
    const newTodo = Todo.create(text);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
});

// PUT update a todo
// PUT /api/todos/:id
router.put('/todos/:id', (req, res) => {
  try {
    const { text, completed } = req.body;
    const updates = {};
    
    // Only update fields that are provided
    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;
    
    const updatedTodo = Todo.update(req.params.id, updates);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
});

// DELETE a todo
// DELETE /api/todos/:id
router.delete('/todos/:id', (req, res) => {
  try {
    const deleted = Todo.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
});

module.exports = router;