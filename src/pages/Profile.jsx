import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { RemindersContext } from '../contexts/RemindersContext';

function Profile() {
  const { user, loading, setUser} = useContext(UserContext);
  const { reminders, fetchReminders, setReminders } = useContext(RemindersContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReminders();

  if (user) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); 

    const alertedReminders = JSON.parse(localStorage.getItem('alertedReminders')) || [];

    const upcomingReminder = reminders.find(reminder => {
      const reminderDate = new Date(reminder.date);
      return reminderDate.toDateString() === tomorrow.toDateString() && !alertedReminders.includes(reminder._id);
    });

    if (upcomingReminder) {
      alert(`Don't forget! You have a reminder for tomorrow: ${upcomingReminder.title}`);
      alertedReminders.push(upcomingReminder._id);
      localStorage.setItem('alertedReminders', JSON.stringify(alertedReminders));
      }
    }
  }, [fetchReminders, reminders, user]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("userId");
    sessionStorage.setItem("anonymousReminders", JSON.stringify([]));
    setReminders([]);
    setUser(null); 
    navigate("/");
  };
  

  if (loading) return <p>Loading profile...</p>;

  return (<>
  <div className="profile-container">
  <div className="card remind-me"><span className="pin">📌</span><Link to="/dashboard">Remind Me</Link></div>
      <h2>Profile</h2>
      <img src="./img/sticker.png" alt="Illustration" style={{display: "block", margin: "-25px auto", width: "150px", height: "auto" }} />
      {user ? (
        <>
          <div className='personal-details'>
          <p>{user.name}</p>
          <p>Email: {user.email}</p>
          </div>
          <Link to="/reminders/completed">Completed Reminders ({reminders.filter((r) => r.completed).length})</Link>
          <button className='log-out' onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
    </>
  );
}

export default Profile;