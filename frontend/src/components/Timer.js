import React, { useEffect, useState } from 'react';

const Timer = ({ timeControl, player }) => {
  const [timeLeft, setTimeLeft] = useState(timeControl);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ margin: '10px', fontWeight: 'bold' }}>
      {player}: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
    </div>
  );
};

export default Timer;