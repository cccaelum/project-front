import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Inicia sesión en Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Guarda el token en localStorage y actualiza axios
      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Obtén los datos del usuario desde el backend
      const response = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("UserId from backend:", response.data.userId);
      setUser(response.data); // Actualiza el contexto de usuario

      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to log in. Check your credentials.");
    }
  };

  return (<>
  <div className="card remind-me"><span className="pin">📌</span><Link to="/">Remind Me</Link></div>
    <div className="log-in-container">
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </>
  );
}

export default Login;