import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Clock from '../components/Clock';
import DarkModeToggle from "../components/DarkToggle";
import LearnMore from "../components/LearnMore";


const Home = () => {
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleLearnMoreClick = () => {
    setShowLearnMore(!showLearnMore);
  };

  return (<>
    <div className="home-container">
    <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
    <div className="card sign-up"><Link to="/register">SIGN UP</Link><span className="arrow">→</span></div>
    <div className="card dark-mode"><DarkModeToggle /></div>
    <div className="card clock"><Clock /></div>
    <div className="card log-in"><Link to="/login">LOG IN</Link><span className="arrow">→</span></div>
    <div
        className={'card learn-more'} 
        onClick={handleLearnMoreClick}
      >
        {!showLearnMore ? (
          <>
            <span>LEARN MORE</span>
            <span className="plus">+</span>
          </>
        ) : (
          <LearnMore />
        )}
      </div>
    <div className="card anonymous"><Link to="/dashboard">Continue as anonymous</Link><span className="arrow">→</span></div>
    <div className="card illustration"><img src="./img/sticker.png" alt="Illustration"/></div>
    </div>
    </>
  );
}

export default Home;