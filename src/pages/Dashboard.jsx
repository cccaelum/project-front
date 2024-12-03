import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DarkModeToggle from "../components/DarkToggle";
import Clock from '../components/Clock';
import AddReminder from "../components/AddReminder";
import Reminders from "./Reminders";
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
        <div className="cards-container">
        <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
        <div className="card sign-up"><Link to="/register">SIGN UP</Link><span className="arrow">→</span></div>
        <div className="card dark-mode"><DarkModeToggle /></div>
        <div className="card clock"><Clock /></div>
        <div className="card add-reminder"><AddReminder/></div>
        <div className="card reminders"><Reminders /></div>
        <div className="card calendar"><Calendar/></div>
        <div className="card weather"><Weather/></div>
        </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;