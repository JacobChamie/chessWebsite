import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ChessboardComponent = ({ turn, setTurn }) => {
  const [game] = useState(new Chess());
  const [boardSize, setBoardSize] = useState(480);

  const onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) {
        return false;
      }

      setTurn(turn === 'w' ? 'b' : 'w'); 
      return true;
    } catch {
      return false;
    }
  };

  const handleResize = (e, data) => {
    setBoardSize(data.size.width);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ResizableBox
        width={boardSize}
        height={boardSize}
        lockAspectRatio
        minConstraints={[300, 300]}
        maxConstraints={[800, 800]}
        onResize={handleResize}
      >
        <Chessboard
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          boardWidth={boardSize}
          customBoardStyle={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 15px rgba(0,0,0,0.5)' }}
          customSquareStyles={{ cursor: 'pointer' }}
          customDropAnimation={{ animation: 'slideIn', duration: 300 }}
        />
      </ResizableBox>
    </div>
  );
};

export default ChessboardComponent;