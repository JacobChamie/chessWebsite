import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());

  const onPieceDrop = (sourceSquare, targetSquare) => {
    const tempGame = new Chess(game.fen()); // Create a temporary instance to test the move

    // Attempt the move
    const move = tempGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Promote to a queen for simplicity
    });

    if (move === null) {
      // Invalid move
      console.error(`Invalid move: { from: ${sourceSquare}, to: ${targetSquare} }`);
      return false;
    }

    // Update the game state with the valid move
    setGame(tempGame);
    return true;
  };

  return (
    <Chessboard
      position={game.fen()} // Pass the FEN string for the current board position
      onPieceDrop={onPieceDrop}
      boardWidth={500}
    />
  );
};

export default ChessboardComponent;
