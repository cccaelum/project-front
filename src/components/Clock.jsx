import { useState, useEffect } from "react";

const Clock = ({ showPomodoro = true }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [Pomodoro, setPomodoro] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (Pomodoro && isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [Pomodoro, isRunning]);

  const toggleView = () => {
    setPomodoro(!Pomodoro);
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (num) => (num < 10 ? "0" + num : num);
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



