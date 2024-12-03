import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [filters, setFilters] = useState({ priority: "", tag: "" });
  const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;

  useEffect(() => {
    const fetchReminders = async () => {
      const token = localStorage.getItem("authToken");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      try {
        const response = await axios.get(urlApi, config);
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
  
      await axios.delete(`${urlApi}/${id}`, config);
      alert('Reminder deleted successfully!');
      setReminders(reminders.filter((reminder) => reminder._id !== id)); 
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };  

  const filteredReminders = reminders.filter((reminder) => {
    return (
      (!filters.priority || reminder.priority === filters.priority) &&
      (!filters.tag || reminder.tag === filters.tag)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="reminders-container">
      <h3>Reminders</h3>
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
      <ul className='reminders-list'>
        {filteredReminders.map((item) => (
          <li key={item._id}>
            <Link to={`/reminders/${item._id}`}>{item.title}</Link>
            <button className="delete-button" onClick={() => handleDelete(item._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
