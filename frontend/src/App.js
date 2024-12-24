import React, { useState } from 'react';
import ChessboardComponent from './components/Chessboard';
import ChatBox from './components/ChatBox';
import Timer from './components/Timer';
import Controls from './components/Controls';

const App = () => {
  const [gameId, setGameId] = useState(null);
  const [timeControl, setTimeControl] = useState(300); // Default 5-minute timer
  const [gameOver, setGameOver] = useState(false);
  const [drawOffered, setDrawOffered] = useState(false);

  const createNewGame = () => {
    setGameId(Date.now());
    setGameOver(false);
    setDrawOffered(false);
  };

  const handleResign = () => {
    setGameOver(true);
    alert('Player has resigned. Game over!');
  };

  const handleOfferDraw = () => {
    setDrawOffered(true);
  };

  const handleAcceptDraw = () => {
    setGameOver(true);
    alert('Draw accepted. Game over!');
  };

  const handleDeclineDraw = () => {
    setDrawOffered(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Chess Game</h1>
      <button onClick={createNewGame}>Create New Game</button>
      <input
        type="number"
        placeholder="Time Control (seconds)"
        onChange={(e) => setTimeControl(Number(e.target.value))}
        style={{ marginLeft: '10px', padding: '5px' }}
      />
      {gameId && !gameOver && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div>
            <Timer timeControl={timeControl} player="Player 1" />
            <ChessboardComponent />
            <Timer timeControl={timeControl} player="Player 2" />
            <Controls
              onResign={handleResign}
              onOfferDraw={handleOfferDraw}
              drawOffered={drawOffered}
              onAcceptDraw={handleAcceptDraw}
              onDeclineDraw={handleDeclineDraw}
            />
          </div>
          <ChatBox userId="User4" />
        </div>
      )}
      {gameOver && <h2>Game Over</h2>}
    </div>
  );
};

export default App;