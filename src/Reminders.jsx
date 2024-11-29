import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

const Reminders = () => {
  const [data, setData] = useState([]);
  const urlApi = `${import.meta.env.VITE_APP_API_URL}reminders`;

  useEffect(() => {
    const fetchReminders = async () => {
      const token = localStorage.getItem("authToken");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      try {
        const response = await axios.get(urlApi, config);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`${item._id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;