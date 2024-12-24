import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit('chat', message);
    setMessages([...messages, { text: message, self: true }]);
    setMessage('');
  };

  socket.on('chat', (text) => {
    setMessages((prevMessages) => [...prevMessages, { text, self: false }]);
  });

  return (
    <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px' }}>
      <h3>Chat</h3>
      <div style={{ height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.self ? 'right' : 'left' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
