import { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="clock-container">
      <h1>{currentTime.toLocaleTimeString('es-ES',{ hour: '2-digit', minute: '2-digit' })}</h1>
    </div>
  );
};

export default Clock;
