import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ReminderDetail = () => {
  const { id } = useParams(); 
  const [reminder, setReminder] = useState(null);
  const urlApi = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const response = await axios.get(`${urlApi}reminders/${id}`); 
        setReminder(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del recordatorio:', error);
      }
    };

    fetchReminder();
  }, [id, urlApi]);

  if (!reminder) {
    return <div>Cargando detalles del recordatorio...</div>;
  }

  return (
    <div>
      <p><strong>Título:</strong> {reminder.title}</p>
      <p><strong>Descripción:</strong> {reminder.description || 'Sin descripción'}</p>
      <p><strong>Prioridad:</strong> {reminder.priority || 'No definida'}</p>
      <p><strong>Fecha:</strong> {reminder.date || 'No definida'}</p>
      <p><strong>Completado:</strong> {reminder.completed ? 'Sí' : 'No'}</p>
    </div>
  );
};

export default ReminderDetail;