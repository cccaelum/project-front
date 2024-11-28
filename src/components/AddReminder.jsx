import { useState } from "react";
import axios from "axios"; 

const AddReminder = () => {
  const [reminderTitle, setreminderTitle] = useState("");
  const [createdReminder, setCreatedReminder] = useState("");
 const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;

  const handleAddReminders = async () => {
    if (!reminderTitle.trim()) {
      alert("El recordatorio no puede estar vacío.");
      return;
    }

    const payload = { title: reminderTitle };

    try {
      const response = await axios.post(urlApi, payload); 
      setCreatedReminder(`Se ha agregado el recordario: ${response.data.title}`);
      setreminderTitle("");
    } catch (error) {
      console.error("Error al añadir recordatorio:", error);
    }
  };

  return (<>
    <div className="add-reminder-div">
      <input
        type="text"
        value={reminderTitle}
        onChange={(e) => setreminderTitle(e.target.value)}
        required
      />
      <button onClick={handleAddReminders}>Add reminder</button>
      {createdReminder && <p>{createdReminder}</p>}
    </div>
    </>
  );
};

export default AddReminder;
