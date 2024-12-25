import React, { useState } from 'react';
import ChessboardComponent from './components/Chessboard';
import ChatBox from './components/ChatBox';
import Timer from './components/Timer';
import Controls from './components/Controls';
import './global.css';

const App = () => {
  const [gameId, setGameId] = useState(null);
  const [timeControl, setTimeControl] = useState(300); // Default 5-minute timer
  const [gameOver, setGameOver] = useState(false);
  const [drawOffered, setDrawOffered] = useState(false);
  const [turn, setTurn] = useState('w'); // 'w' for white, 'b' for black
  const [winner, setWinner] = useState(null);

  const createNewGame = () => {
    setGameId(Date.now());
    setGameOver(false);
    setDrawOffered(false);
    setTurn('w');
    setWinner(null);
  };

  const handleResign = () => {
    setGameOver(true);
    setWinner(turn === 'w' ? 'Player 2 (Black)' : 'Player 1 (White)');
    alert(`${winner} has won by resignation!`);
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

  const handleTimeout = (player) => {
    setGameOver(true);
    setWinner(player === 'w' ? 'Player 2 (Black)' : 'Player 1 (White)');
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#1e1e1e', minHeight: '100vh', color: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginTop: 0, lineHeight: 3 }}>Chess Game</h1>
      <button style={{ padding: '15px 30px', fontSize: '18px', marginRight: '15px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={createNewGame}>
        Create New Game
      </button>
      <input
        type="number"
        placeholder="Time Control (seconds)"
        onChange={(e) => setTimeControl(Number(e.target.value))}
        style={{ padding: '15px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '8px' }}
      />
      {gameId && !gameOver && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <div>
            <Timer
              timeControl={timeControl}
              player="Player 2 (Black)"
              active={turn === 'b'}
              onTimeout={() => handleTimeout('b')}
              isActive={turn === 'b'}
            />
            <ChessboardComponent turn={turn} setTurn={setTurn} />
            <Timer
              timeControl={timeControl}
              player="Player 1 (White)"
              active={turn === 'w'}
              onTimeout={() => handleTimeout('w')}
              isActive={turn === 'w'}
            />
          </div>
          <ChatBox userId="User4" />
        </div>
      )}
      {gameOver && <h2 style={{ color: '#ff5722', fontSize: '2rem' }}>Game Over - {winner}</h2>}
    </div>
  );
};

export default App;