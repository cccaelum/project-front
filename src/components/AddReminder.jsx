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
      <h3>Add Reminder</h3>
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
        <option value="" disabled hidden>Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        name="tag"
        value={reminder.tag}
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>Tag</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
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
      <button onClick={handleAddReminders}>+</button>
      {createdReminder && <p>{createdReminder}</p>}
    </div>
  );
};

export default AddReminder;

