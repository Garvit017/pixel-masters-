// For simplicity, we'll use an in-memory array instead of MongoDB
let todos = [];
let idCounter = 1;

// Get all todos
exports.getTodos = (req, res) => {
  res.status(200).json(todos);
};

// Add a new todo
exports.createTodo = (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ message: 'Please add a text field' });
  }

  const newTodo = {
    id: idCounter++,
    text,
    completed: false,
    createdAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// Delete a todo
exports.deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  todos = todos.filter(todo => todo.id !== id);
  
  res.status(200).json({ message: 'Todo deleted successfully' });
};

// Toggle todo completion status
exports.toggleTodo = (req, res) => {
  const id = parseInt(req.params.id);
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  todos[todoIndex].completed = !todos[todoIndex].completed;
  
  res.status(200).json(todos[todoIndex]);
};