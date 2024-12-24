import React from 'react';

const Controls = ({ onResign, onOfferDraw, drawOffered, onAcceptDraw, onDeclineDraw }) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <button onClick={onResign} style={{ marginRight: '10px', padding: '10px' }}>
        Resign
      </button>
      {!drawOffered ? (
        <button onClick={onOfferDraw} style={{ padding: '10px' }}>
          Offer Draw
        </button>
      ) : (
        <div style={{ marginTop: '10px' }}>
          <button onClick={onAcceptDraw} style={{ marginRight: '10px', padding: '10px' }}>
            Accept Draw
          </button>
          <button onClick={onDeclineDraw} style={{ padding: '10px' }}>
            Decline Draw
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;