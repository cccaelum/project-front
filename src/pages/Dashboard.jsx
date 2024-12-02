import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Clock from '../components/Clock';
import AddReminder from "../components/AddReminder";
import Calendar from "../components/Calendar";
import Weather from "../components/Weather";


const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (<div className="dashboard-container">
  {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
          <div className="card clock"><Clock /></div>
          <AddReminder/>
          <Calendar/>
          <Weather/>
        </>
      ) : (
        <>
        <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
        <div className="card clock"><Clock /></div>
        <AddReminder/>
        <Calendar/>
        <Weather/>
        </>
      )}
    </div>
  );
}

export default Dashboard;