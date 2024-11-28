import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Clock from '../components/Clock';
import DarkModeToggle from "../components/DarkToggle";

const Home = () => {
  return (
    <div className="home-container">
        
    <div className="card remind-me"><span className="pin">📌</span>Remind Me</div>
    <div className="card sign-up"><Link to="/register">SIGN UP</Link><span className="arrow">→</span></div>
    <div className="card dark-mode"><DarkModeToggle /></div>
    <div className="card clock"><Clock /></div>
    <div className="card log-in"><Link to="/login">LOG IN</Link><span className="arrow">→</span></div>
    <div className="card learn-more"><Link to="/learn">LEARN MORE</Link><span className="plus">+</span></div>
    <div className="card anonymous"><Link to="/addreminder">Continue as anonymous</Link><span className="arrow">→</span></div>
    <div className="card illustration"><img src="./img/sticker.png" alt="Illustration"/></div>
    </div>
  );
}

export default Home;