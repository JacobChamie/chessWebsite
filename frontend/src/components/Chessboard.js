import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());

  const onPieceDrop = (sourceSquare, targetSquare) => {
    const tempGame = new Chess(game.fen());
    const move = tempGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Promote to queen for simplicity
    });

    if (move === null) {
      return false; // Invalid move, reset the piece without errors
    }

    setGame(tempGame);
    return true; // Valid move
  };

  return (
    <div style={{ margin: '20px auto', width: '500px' }}>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onPieceDrop}
        boardWidth={500}
      />
    </div>
  );
};

export default ChessboardComponent;