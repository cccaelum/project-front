import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);

      await axios.post(
        "/profile",
        { uid: user.uid, name, email, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser({ uid: user.uid, name, email, city }); 

      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (<>
  <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
    <div className="register-container">
      <h2>Sign up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </>
  );
}

export default Register;