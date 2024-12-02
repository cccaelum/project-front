import { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
  
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const firstDayOfMonth = (new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay() + 6) % 7;
  
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  
    const changeMonth = (direction) => {
      const newMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + direction,
        1
      );
      setCurrentDate(newMonth);
    };
  
    const generateDays = () => {
      const days = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="empty"></div>);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(
          <div key={day} className="day">
            {day}
          </div>
        );
      }
      return days;
    };
  
    return (
      <div className="calendar">
        <header className="arrow-container">
          <button onClick={() => changeMonth(-1)} className="arrow-button">{"<"}</button>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={() => changeMonth(1)} className="arrow-button">{">"}</button>
        </header>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="days">{generateDays()}</div>
      </div>
    );
  };
  
  export default Calendar;