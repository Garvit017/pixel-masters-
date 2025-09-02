// In-memory data store for todos
let todos = [];
let idCounter = 1;

class Todo {
  constructor(text) {
    this.id = idCounter++;
    this.text = text;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }

  // Get all todos with optional filter
  static getAll(filter = {}) {
    let filteredTodos = [...todos];
    
    // Filter by completion status if specified
    if (filter.completed !== undefined) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.completed === (filter.completed === 'true'));
    }
    
    // Filter by text if specified
    if (filter.text) {
      const searchText = filter.text.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => 
        todo.text.toLowerCase().includes(searchText));
    }
    
    return filteredTodos;
  }

  // Get a single todo by ID
  static getById(id) {
    return todos.find(todo => todo.id === parseInt(id));
  }

  // Create a new todo
  static create(text) {
    const newTodo = new Todo(text);
    todos.push(newTodo);
    return newTodo;
  }

  // Update a todo
  static update(id, updates) {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    if (todoIndex === -1) return null;
    
    const updatedTodo = { ...todos[todoIndex], ...updates };
    todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  // Delete a todo
  static delete(id) {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    if (todoIndex === -1) return false;
    
    todos.splice(todoIndex, 1);
    return true;
  }

  // Clear all todos (for testing)
  static clearAll() {
    todos = [];
    idCounter = 1;
    return { message: 'All todos cleared' };
  }
}

module.exports = Todo;