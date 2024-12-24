import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move) {
      setGame(game);
      socket.emit('move', { move });
    }
  };

  socket.on('move', ({ move }) => {
    game.move(move);
    setGame(game);
  });

  return (
    <Chessboard
      position={game.fen()}
      onDrop={onDrop}
    />
  );
};

export default ChessboardComponent;
