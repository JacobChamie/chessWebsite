import React, { useEffect, useState } from 'react';

const Timer = ({ timeControl, player, active, onTimeout, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(timeControl);

  useEffect(() => {
    if (!active || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, timeLeft, onTimeout]);

  return (
    <div style={{
      margin: '15px',
      padding: '20px',
      fontWeight: 'bold',
      color: '#f5f5f5',
      backgroundColor: isActive ? '#4caf50' : '#333',
      borderRadius: '12px',
      textAlign: 'center',
      fontSize: '20px',
      transition: 'background-color 0.3s ease',
    }}>
      {player}: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
    </div>
  );
};

export default Timer;