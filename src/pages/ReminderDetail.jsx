import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { RemindersContext } from "../contexts/RemindersContext";
import axios from "axios";

const ReminderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reminders, fetchReminders } = useContext(RemindersContext);
  const [reminder, setReminder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES'); 
  };

  useEffect(() => {
    const selectedReminder = reminders.find((r) => r._id === id);
    if (selectedReminder) {
      setReminder(selectedReminder);
      setFormData(selectedReminder);
    } else {
      const fetchReminder = async () => {
        try {
          const response = await axios.get(`${urlApi}/${id}`);
          setReminder(response.data);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching reminder:", error);
        }
      };
      fetchReminder();
    }
  }, [id, reminders, urlApi]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      description: formData.description || null,  
      url: formData.url || null, 
    };
    try {
      await axios.put(`${urlApi}/${id}`, updatedData);
      alert("Reminder updated successfully!");
      setReminder(updatedData);
      setIsEditing(false);
      fetchReminders(); 
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${urlApi}/${id}`);
      alert("Reminder deleted successfully!");
      navigate("/reminders");
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  if (!reminder) {
    return <div>Loading reminder details...</div>;
  }

  return (
    <div className="details-container">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-reminder-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label>
            Tag
            <select 
            name="tag" 
            value={formData.tag} 
            onChange={handleChange} 
            required
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>URL<input type="url" name="url" value={formData.url} onChange={handleChange}/></label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleEditToggle}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>
            <strong>{reminder.title}</strong> 
          </p>
          <p>
            <strong>○ Description:</strong> {reminder.description || "No description"}
          </p>
          <p>
            <strong>○ Priority:</strong> {reminder.priority || "Not defined"}
          </p>
          <p>
            <strong>○ Tag:</strong> {reminder.tag || "Not defined"}
          </p>
          <p>
          <strong>○ Date:</strong> {reminder.date ? (formatDate(reminder.date) || "Not defined") : "Not defined"}
          </p>
          <p>
            <strong>○ URL:</strong> {reminder.url ? (<a href={reminder.url} target="_blank" rel="noopener noreferrer">{reminder.url}</a>) : "Not defined"}
          </p>
          <div className="reminder-buttons">
            <button className="edit-button" onClick={handleEditToggle}>
              ✏️ Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              ❌ Delete
            </button>
          </div>
        </>
      )}
      <Link to="/dashboard">Dashboard ↻</Link>
    </div>
  );
};

export default ReminderDetail;
