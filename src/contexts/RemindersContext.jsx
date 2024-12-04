import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const RemindersContext = createContext();

export const RemindersProvider = ({ children }) => {
  const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;
  const { user } = useContext(UserContext);

  const loadAnonymousReminders = () => {
    return JSON.parse(sessionStorage.getItem("anonymousReminders")) || [];
  };

  const [reminders, setReminders] = useState(loadAnonymousReminders);

  const fetchReminders = async () => {
    const token = localStorage.getItem("authToken");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    try {
      const response = await axios.get(urlApi, config);

      if (user) {
        const filteredReminders = response.data.filter(
          (reminder) => reminder.userId === user.uid
        );
        setReminders(filteredReminders);
      } else {
        setReminders(loadAnonymousReminders());
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const saveToSessionStorage = (newReminder) => {
    console.log("Saving to sessionStorage:", newReminder);
    const reminders =
      JSON.parse(sessionStorage.getItem("anonymousReminders")) || [];
    reminders.push(newReminder);
    sessionStorage.setItem("anonymousReminders", JSON.stringify(reminders));
    console.log("Saved reminders:", sessionStorage.getItem("anonymousReminders"));
  };

  const addReminder = (newReminder) => {
    console.log("Current user:", user);
    if (!user) {
      saveToSessionStorage(newReminder);
    }
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };

  const completeReminder = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      await axios.put(`${urlApi}/${id}`, { completed: true }, config);
      setReminders((prevReminders) =>
        prevReminders.filter((reminder) => reminder._id !== id)
      );
    } catch (error) {
      console.error("Error marking reminder as complete:", error);
    }
  };

  const deleteReminder = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      await axios.delete(`${urlApi}/${id}`, config);
      setReminders((prevReminders) =>
        prevReminders.filter((reminder) => reminder._id !== id)
      );
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  useEffect(() => {
    console.log("User changed:", user);
    if (user) {
      sessionStorage.removeItem("anonymousReminders");
    }
    fetchReminders();
  }, [user]);

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        fetchReminders,
        addReminder,
        completeReminder,
        deleteReminder,
        setReminders,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};


