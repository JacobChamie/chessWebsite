import React, { useState } from 'react';
import ChessboardComponent from './components/Chessboard';
import ChatBox from './components/ChatBox';
import Timer from './components/Timer';
import { FaFlag, FaCompressArrowsAlt, FaHandshake } from 'react-icons/fa';
import './global.css';

const App = () => {
  const [gameId, setGameId] = useState(null);
  const [timeControl, setTimeControl] = useState(300); // Default 5-minute timer
  const [gameOver, setGameOver] = useState(false);
  const [drawOffered, setDrawOffered] = useState(false);
  const [turn, setTurn] = useState('w'); // 'w' for white, 'b' for black
  const [winner, setWinner] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resetToMainMenu = () => {
    setGameId(null);
    setGameOver(false);
    setDrawOffered(false);
    setTurn('w');
    setWinner(null);
    setIsFullscreen(false);
  };

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
  };

  const handleOfferDraw = () => {
    setDrawOffered(true);
  };

  const handleAcceptDraw = () => {
    setGameOver(true);
    setWinner('Draw');
    setDrawOffered(false);
  };

  const handleDeclineDraw = () => {
    setDrawOffered(false);
  };

  const handleTimeout = (player) => {
    setGameOver(true);
    setWinner(player === 'w' ? 'Player 2 (Black)' : 'Player 1 (White)');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#1e1e1e', minHeight: '100vh', color: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {!isFullscreen && (
        <>
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
        </>
      )}
      {gameId && !gameOver && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          {!isFullscreen && <ChatBox userId="User4" />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={handleResign}
              style={{
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <FaFlag /> Resign
            </button>
            <button
              onClick={handleOfferDraw}
              style={{
                backgroundColor: '#ffcc00',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <FaHandshake /> Offer Draw
            </button>
            <button
              onClick={toggleFullscreen}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <FaCompressArrowsAlt /> Fullscreen
            </button>
          </div>
        </div>
      )}
      {drawOffered && !gameOver && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleAcceptDraw} style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4caf50', color: '#fff', borderRadius: '8px' }}>
            Accept Draw
          </button>
          <button onClick={handleDeclineDraw} style={{ padding: '10px', backgroundColor: '#f44336', color: '#fff', borderRadius: '8px' }}>
            Decline Draw
          </button>
        </div>
      )}
      {gameOver && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '12px',
            color: '#f5f5f5',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Game Over - {winner}</h2>
          <button onClick={resetToMainMenu} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#4caf50', color: '#fff', borderRadius: '8px' }}>
            Main Menu
          </button>
          <button onClick={createNewGame} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '8px' }}>
            New Game
          </button>
          <button
            onClick={resetToMainMenu}
            style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', color: '#fff', fontSize: '1.5rem', border: 'none', cursor: 'pointer' }}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
