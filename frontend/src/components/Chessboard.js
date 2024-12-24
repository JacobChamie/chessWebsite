import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = ({ turn, setTurn }) => {
  const [game, setGame] = useState(new Chess());

  const onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      if ((turn === 'w' && game.turn() !== 'w') || (turn === 'b' && game.turn() !== 'b')) {
        console.warn('Not your turn!');
        return false;
      }

      const tempGame = new Chess(game.fen());
      const move = tempGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Promote to queen for simplicity
      });

      if (move === null) {
        console.warn(`Invalid move: { from: ${sourceSquare}, to: ${targetSquare} }`);
        return false; // Invalid move, reset the piece without any exceptions
      }

      setGame(tempGame);
      setTurn(tempGame.turn());
      return true; // Valid move
    } catch (error) {
      console.error('An error occurred during the move:', error);
      return false; // Ignore and reset for unexpected exceptions
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