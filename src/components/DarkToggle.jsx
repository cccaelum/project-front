import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]); 

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="dark-mode-toggle">
      <button onClick={toggleDarkMode}>
        {darkMode ? "LIGHT THEME" : "DARK THEME"}
      </button>
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        <span className="slider">
          <span className="icon"></span>
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;

