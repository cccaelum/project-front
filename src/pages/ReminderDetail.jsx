import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ReminderDetail = () => {
  const { id } = useParams(); 
  const [reminder, setReminder] = useState(null);
  const urlApi = import.meta.env.VITE_APP_API_URL;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES'); 
  };

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const response = await axios.get(`${urlApi}reminders/${id}`); 
        setReminder(response.data);
      } catch (error) {
        console.error('Error getting reminder details:', error);
      }
    };

    fetchReminder();
  }, [id, urlApi]);

  if (!reminder) {
    return <div>Loading reminder details...</div>;
  }

  return (
    <div>
      <p><strong>Title:</strong> {reminder.title}</p>
      <p><strong>Description:</strong> {reminder.description || 'No description'}</p>
      <p><strong>Priority:</strong> {reminder.priority || 'Not defined'}</p>
      <p>
        <strong>Date:</strong>{' '}
        {reminder.date ? formatDate(reminder.date) : 'Not defined'}
      </p>
      <p><strong>Completed:</strong> {reminder.completed ? 'Yes' : 'No'}</p>
      {reminder.url && (
        <p>
          <strong>URL:</strong>{' '}
          <a href={reminder.url} target="_blank" rel="noopener noreferrer">
            {reminder.url}
          </a>
        </p>
      )}
    </div>
  );
};

export default ReminderDetail;