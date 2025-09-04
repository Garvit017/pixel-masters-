const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// User model and authentication will be implemented later
const users = {};
const userSocketMap = {}; // Maps userId to socketId
const socketUserMap = {}; // Maps socketId to userId

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketio(server, {
  cors: {
    origin: "*", // In production, restrict to your frontend domain
    methods: ["GET", "POST"]
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
  
  // User authentication and joining
  socket.on('user_connected', ({ userId, username }) => {
    // Store user information
    users[userId] = {
      id: userId,
      username,
      status: 'online',
      socketId: socket.id
    };
    
    // Map socket to user and vice versa
    userSocketMap[userId] = socket.id;
    socketUserMap[socket.id] = userId;
    
    // Broadcast user status to all connected clients
    io.emit('user_status_changed', { userId, status: 'online' });
    
    // Send the current users list to the newly connected user
    socket.emit('users_list', Object.values(users));
    
    console.log(`User connected: ${username} (${userId})`);
  });
  
  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const { to, from, content, timestamp } = messageData;
    
    // Store message in database (to be implemented)
    
    // If it's a private message, send only to the recipient
    if (to !== 'global') {
      const recipientSocketId = userSocketMap[to];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', messageData);
      }
      // Also send back to sender
      socket.emit('receive_message', messageData);
    } else {
      // Global message - broadcast to everyone
      io.emit('receive_message', messageData);
    }
  });
  
  // Handle typing indicator
  socket.on('typing', ({ userId, isTyping, to }) => {
    if (to !== 'global') {
      const recipientSocketId = userSocketMap[to];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('user_typing', { userId, isTyping });
      }
    } else {
      // Global typing indicator
      socket.broadcast.emit('user_typing', { userId, isTyping });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    const userId = socketUserMap[socket.id];
    if (userId) {
      // Update user status
      if (users[userId]) {
        users[userId].status = 'offline';
      }
      
      // Broadcast user status change
      io.emit('user_status_changed', { userId, status: 'offline' });
      
      // Clean up maps
      delete userSocketMap[userId];
      delete socketUserMap[socket.id];
      
      console.log(`User disconnected: ${userId}`);
    }
    
    console.log(`Connection closed: ${socket.id}`);
  });
});

// Basic API routes
app.get('/', (req, res) => {
  res.send('Chat API is running');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});