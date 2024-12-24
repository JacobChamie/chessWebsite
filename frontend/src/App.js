import React, { useState } from 'react';
import Chessboard from './components/Chessboard';
import ChatBox from './components/ChatBox';

const App = () => {
  const [gameId, setGameId] = useState(null);

  const createNewGame = () => {
    setGameId(Date.now());
  };

  return (
    <div>
      <h1>Chess Game</h1>
      <button onClick={createNewGame}>Create New Game</button>
      {gameId && (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Chessboard />
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default App;
