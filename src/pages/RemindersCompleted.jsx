import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RemindersContext } from "../contexts/RemindersContext";

const RemindersCompleted = () => {
  const { reminders, fetchReminders } = useContext(RemindersContext);

  const completedReminders = reminders.filter((reminder) => reminder.completed);

  useEffect(() => {
    fetchReminders(); 
  }, [fetchReminders]);

  return (
    <div className="completed-reminders-container">
      <div><h2>Completed Reminders</h2><Link to="/profile">Back to Profile →</Link></div>
      {completedReminders.length === 0 ? (
        <p>No completed reminders yet!</p>
      ) : (
        <ul className="completed-reminders-list">
          {completedReminders.map((reminder) => (
            <li key={reminder._id}>
              <strong>{reminder.title}</strong>
              <p>
                <em>Completed:</em> {new Date(reminder.updatedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
      
    </div>
    
  );
};

export default RemindersCompleted;

