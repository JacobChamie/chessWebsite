import React, { useState } from 'react';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

const ChatBox = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, `${userId}: ${input}`]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Draggable>
      <div style={{ width: '400px', backgroundColor: '#2a2a2a', borderRadius: '12px', padding: '20px', color: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Chat</h3>
        <div style={{ height: '150px', overflowY: 'scroll', marginBottom: '20px', backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '8px', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.3)' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          style={{ width: 'calc(100% - 70px)', padding: '14px', border: '1px solid #555', borderRadius: '8px', backgroundColor: '#2a2a2a', color: '#fff' }}
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '14px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Send
        </button>
      </div>
    </Draggable>
  );
};

export default ChatBox;