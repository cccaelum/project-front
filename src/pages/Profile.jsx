import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AddReminder from "../components/AddReminder";

function Profile() {
  const { user, loading, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setUser(null); 
    navigate("/");
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <Link to="/reminders">Go to Reminders</Link>
          <h3>Add a new reminder</h3>
          <AddReminder />
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default Profile;