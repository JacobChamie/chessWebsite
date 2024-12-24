import React, { useState } from 'react';

const ChatBox = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, `${userId}: ${input}`]);
      setInput('');
    }
  };

  return (
    <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', width: '300px' }}>
      <h3>Chat</h3>
      <div style={{ height: '200px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        style={{ width: 'calc(100% - 50px)', padding: '5px' }}
      />
      <button onClick={handleSend} style={{ marginLeft: '5px', padding: '5px' }}>
        Send
      </button>
    </div>
  );
};

export default ChatBox;
