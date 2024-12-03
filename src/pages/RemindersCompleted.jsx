import { useEffect, useState } from "react";
import axios from "axios";

const RemindersCompleted = () => {
  const [completedReminders, setCompletedReminders] = useState([]);
  const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;

  useEffect(() => {
    const fetchCompletedReminders = async () => {
      const token = localStorage.getItem("authToken");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      try {
        const response = await axios.get(urlApi, config);
        const completed = response.data.filter(reminder => reminder.completed);
        setCompletedReminders(completed);
      } catch (error) {
        console.error("Error fetching completed reminders:", error);
      }
    };

    fetchCompletedReminders();
  }, []);

  return (
    <div className="completed-reminders-container">
      <h3>Completed Reminders</h3>
      <ul className='completed-reminders-list'>
        {completedReminders.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersCompleted;
