import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaPaperPlane, FaUsers, FaCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  fetchUsers,
  getMessages,
  getGlobalMessages,
  sendMessage,
  setSelectedUser,
  setOnlineUsers,
  updateUserStatus,
  setTyping,
  addMessage,
} from '../slices/chatSlice';
import { initSocket, disconnectSocket } from '../services/socketService';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isGlobalChat, setIsGlobalChat] = useState(true);

  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const {
    users,
    selectedUser,
    messages,
    onlineUsers,
    typingUsers,
    isLoading,
  } = useSelector((state) => state.chat);

  // Initialize socket connection
  useEffect(() => {
    if (userInfo) {
      const newSocket = initSocket(userInfo.token);
      setSocket(newSocket);

      // Socket event listeners
      newSocket.on('userList', (users) => {
        dispatch(setOnlineUsers(users));
      });

      newSocket.on('userStatus', ({ userId, status }) => {
        dispatch(updateUserStatus({ userId, status }));
      });

      newSocket.on('message', (message) => {
        dispatch(addMessage(message));
        scrollToBottom();
      });

      newSocket.on('typing', ({ userId, isTyping }) => {
        dispatch(setTyping({ userId, isTyping }));
      });

      // Cleanup on unmount
      return () => {
        disconnectSocket(newSocket);
      };
    }
  }, [userInfo, dispatch]);

  // Fetch users and messages
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUsers());
      dispatch(getGlobalMessages());
    }
  }, [userInfo, dispatch]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserSelect = (user) => {
    if (user) {
      dispatch(setSelectedUser(user));
      dispatch(getMessages(user._id));
      setIsGlobalChat(false);
    } else {
      dispatch(setSelectedUser(null));
      dispatch(getGlobalMessages());
      setIsGlobalChat(true);
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', {
        userId: userInfo._id,
        recipientId: selectedUser?._id,
        isTyping: true,
        isGlobal: isGlobalChat,
      });
    }

    // Clear previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set new timeout
    const timeout = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('typing', {
        userId: userInfo._id,
        recipientId: selectedUser?._id,
        isTyping: false,
        isGlobal: isGlobalChat,
      });
    }, 2000);

    setTypingTimeout(timeout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const messageData = {
      content: message,
      recipientId: selectedUser?._id,
      isGlobal: isGlobalChat,
    };

    dispatch(sendMessage(messageData));
    setMessage('');

    // Clear typing indicator
    socket?.emit('typing', {
      userId: userInfo._id,
      recipientId: selectedUser?._id,
      isTyping: false,
      isGlobal: isGlobalChat,
    });
  };

  return (
    <Container fluid className="chat-container py-3">
      <Row className="h-100">
        {/* User List Sidebar */}
        <Col md={3} className="chat-sidebar">
          <div className="sidebar-header">
            <h4>Chats</h4>
          </div>
          <div className="user-list">
            <div
              className={`user-item ${isGlobalChat ? 'active' : ''}`}
              onClick={() => handleUserSelect(null)}
            >
              <div className="d-flex align-items-center">
                <FaUsers className="me-2" />
                <span>Global Chat</span>
              </div>
            </div>
            {users.map((user) => (
              <div
                key={user._id}
                className={`user-item ${selectedUser?._id === user._id ? 'active' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span>{user.username}</span>
                  </div>
                  <div>
                    <FaCircle
                      className={`status-indicator ${onlineUsers.includes(user._id) ? 'online' : 'offline'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Chat Area */}
        <Col md={9} className="chat-area">
          <div className="chat-header">
            <h4>
              {isGlobalChat ? 'Global Chat' : selectedUser?.username}
              {!isGlobalChat && (
                <Badge
                  bg={onlineUsers.includes(selectedUser?._id) ? 'success' : 'secondary'}
                  className="ms-2"
                >
                  {onlineUsers.includes(selectedUser?._id) ? 'Online' : 'Offline'}
                </Badge>
              )}
            </h4>
          </div>

          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === userInfo._id ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  <p>{msg.content}</p>
                  <small className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {(isGlobalChat && typingUsers.some((user) => user.isTyping && user.isGlobal)) ||
            (!isGlobalChat &&
              typingUsers.some(
                (user) => user.isTyping && user.userId === selectedUser?._id
              )) ? (
              <div className="typing-indicator">
                <span>typing...</span>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <Form onSubmit={handleSubmit} className="message-input-form">
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleTyping}
                disabled={isLoading || (!isGlobalChat && !selectedUser)}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || message.trim() === '' || (!isGlobalChat && !selectedUser)}
              >
                <FaPaperPlane />
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatScreen;