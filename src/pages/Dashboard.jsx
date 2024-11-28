import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Clock from '../components/Clock';
import DarkModeToggle from "../components/DarkToggle";
import AddReminder from "../components/AddReminder";


const Dashboard = () => {
  return (<>
    <div className="dashboard-container">
    <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
    <div className="card dark-mode"><DarkModeToggle /></div>
    <div className="card clock"><Clock /></div>
    <AddReminder/>
    </div>
    </>
  );
}

export default Dashboard;