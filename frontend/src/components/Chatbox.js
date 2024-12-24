import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    setMessages([...messages, { text: message }]);
    setMessage('');
  };

  return (
    <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px' }}>
      <h3>Chat</h3>
      <div style={{ height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
