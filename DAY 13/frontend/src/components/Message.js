import React from 'react';
import '../styles/Message.css';

const Message = ({ message, type = 'error' }) => {
  if (!message) return null;
  
  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
};

export default Message;