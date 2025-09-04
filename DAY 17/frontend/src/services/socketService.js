import { io } from 'socket.io-client';
import store from '../store';
import {
  addMessage,
  updateUserStatus,
  setTyping,
  setOnlineUsers,
} from '../slices/chatSlice';

let socket;

export const initSocket = (token) => {
  // Connect to the socket server with auth token
  socket = io('http://localhost:5000', {
    auth: {
      token,
    },
  });

  // Socket is now authenticated via token

  // Listen for users list
  socket.on('userList', (users) => {
    store.dispatch(setOnlineUsers(users));
  });

  // Listen for user status changes
  socket.on('userStatus', ({ userId, status }) => {
    store.dispatch(updateUserStatus({ userId, status }));
  });

  // Listen for incoming messages
  socket.on('message', (message) => {
    store.dispatch(addMessage(message));
  });

  // Listen for typing indicators
  socket.on('typing', ({ userId, isTyping }) => {
    store.dispatch(setTyping({ userId, isTyping }));
  });

  return socket;
};

export const sendMessage = (messageData) => {
  if (socket) {
    socket.emit('sendMessage', messageData);
  }
};

export const sendTypingStatus = (typingData) => {
  if (socket) {
    socket.emit('typing', typingData);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendTypingStatus = (isTyping, to) => {
  if (socket) {
    const userId = store.getState().auth.userInfo.user.id;
    socket.emit('typing', { userId, isTyping, to });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};