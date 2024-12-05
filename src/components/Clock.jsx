import { useState, useEffect, useRef } from "react";

const formatTime = (num) => (num < 10 ? "0" + num : num);

const Clock = ({ showPomodoro = true }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [Pomodoro, setPomodoro] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null); 
  const alarm = useRef(new Audio("/sounds/alarm.mp3")); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Pomodoro && isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 1) {
            alarm.current.play();
          }
          return prevTimeLeft > 0 ? prevTimeLeft - 1 : 0;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [Pomodoro, isRunning]);

  const toggleView = () => {
    setPomodoro(!Pomodoro);
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const formattedTime = `${formatTime(Math.floor(timeLeft / 60))}:${formatTime(timeLeft % 60)}`;

  return (
    <div className="clock-container">
      {!Pomodoro ? (
        <>
          {showPomodoro && <span className="timer" onClick={toggleView}>⏰</span>}
          <h1>{currentTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</h1>
        </>
      ) : (
        <div className="pomodoro">
          <h1>{formattedTime}</h1>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "⏸️" : "▶️"}
          </button>
          <button onClick={toggleView}>↩️</button>
        </div>
      )}
    </div>
  );
};

export default Clock;




