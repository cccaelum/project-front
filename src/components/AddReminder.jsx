import { useState } from "react";
import axios from "axios";

const AddReminder = () => {
  const [reminder, setReminder] = useState({
    title: "",
    description: "",
    priority: "",
    tag: "",
    date: "",
    url: "",
  });
  const [createdReminder, setCreatedReminder] = useState("");
  const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddReminders = async () => {
    if (!reminder.title.trim()) {
      alert("The reminder title cannot be empty.");
      return;
    }

    const token = localStorage.getItem("authToken");
    const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

    try {
      const response = await axios.post(urlApi, reminder, config);
      setCreatedReminder(`Reminder added: ${response.data.title}`);
      setReminder({
        title: "",
        description: "",
        priority: "",
        tag: "",
        date: "",
        url: "",
      });
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  return (
    <div className="add-reminder-div">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={reminder.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={reminder.description}
        onChange={handleChange}
      />
      <select
        name="priority"
        value={reminder.priority}
        onChange={handleChange}
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        value={reminder.tag}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={reminder.date}
        onChange={handleChange}
      />
      <input
        type="url"
        name="url"
        placeholder="URL"
        value={reminder.url}
        onChange={handleChange}
      />
      <button onClick={handleAddReminders}>Add Reminder</button>
      {createdReminder && <p>{createdReminder}</p>}
    </div>
  );
};

export default AddReminder;

