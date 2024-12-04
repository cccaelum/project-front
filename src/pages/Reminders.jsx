import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RemindersContext } from "../contexts/RemindersContext";

const Reminders = () => {
  const {
    reminders,
    fetchReminders,
    deleteReminder,
    completeReminder,
  } = useContext(RemindersContext);

  const [filters, setFilters] = useState({ priority: "", tag: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReminders(); 
  }, []);

  const handleMarkAsComplete = async (id, title) => {
    await completeReminder(id);
    setMessage(`Reminder "${title}" completed`);
  };

  const handleDelete = async (id, title) => {
    await deleteReminder(id);
    setMessage(`Reminder "${title}" deleted`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredReminders = reminders.filter((reminder) => {
    return (
      !reminder.completed &&
      (!filters.priority || reminder.priority === filters.priority) &&
      (!filters.tag || reminder.tag === filters.tag)
    );
  });

  return (
    <div className="reminders-container">
      <Link to="/reminders">
        <h3>Reminders</h3>
      </Link>
      <div className="filters">
        <select name="priority" onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select name="tag" onChange={handleFilterChange}>
          <option value="">All Tags</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
      </div>
      <ul className="reminders-list">
        {filteredReminders.map((item) => (
          <li key={item._id}>
            <span>{item.title}</span>
            <div className="reminder-buttons">
            <button
              className="details-button"
              onClick={(e) => e.stopPropagation()}
            >
              <Link to={`/reminders/${item._id}`}>
                👁️
              </Link>
            </button>
            <button className="complete-button" onClick={() => handleMarkAsComplete(item._id, item.title)}>✔️</button>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item._id, item.title);
              }}
            >
              ❌
            </button>
            </div>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Reminders;


