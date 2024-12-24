import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());

  const onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      const tempGame = new Chess(game.fen());
      const move = tempGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Promote to queen for simplicity
      });

      if (move === null) {
        console.warn(`Invalid move: { from: ${sourceSquare}, to: ${targetSquare} }`);
        return false; // Reset the piece without any exceptions
      }

      setGame(tempGame);
      return true; // Valid move
    } catch (error) {
      console.error("Error processing move:", error);
      return false; // Ensure no uncaught exceptions disrupt gameplay
    }
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