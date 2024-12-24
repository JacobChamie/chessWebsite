import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = ({ turn, setTurn }) => {
  const [game] = useState(new Chess());

  const onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Promote to queen for simplicity
      });

      if (move === null) {
        return false; // Invalid move
      }

      setTurn(turn === 'w' ? 'b' : 'w'); // Switch turn
      return true; // Valid move
    } catch {
      return false; // Catch any unexpected errors
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onPieceDrop}
        boardWidth={480}
        customBoardStyle={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 15px rgba(0,0,0,0.5)' }}
        customSquareStyles={{ cursor: 'pointer' }}
        customDropAnimation={{ animation: 'slideIn', duration: 300 }}
      />
    </div>
  );
};

export default ChessboardComponent;