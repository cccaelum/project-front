import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import Reminders from './Reminders';
import AddReminder from './AddReminder';
import ReminderDetail from './ReminderDetail';
import UserProvider from "./contexts/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const App = () => {
  const [data, setData] = useState(null)
  const urlApi = import.meta.env.VITE_APP_API_URL

  const fetchData = async () => {
    try {
      const response = await fetch(urlApi)
      const resData = await response.json()
      setData(resData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [data])

  return (
    <UserProvider>
    <Router>
      <div>
        {/* <nav>
          <Link to="/">Inicio</Link>
          <br></br>
          <Link to="/register">Registrarse</Link>
          <br></br>
          <Link to="/login">Login</Link>
          <br></br>
          <Link to="/addreminder">Agregar recordatorio</Link>
        </nav> */}
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

            {/* <Route path="/" element={<Reminders data={data} />} /> */}

            <Route
              path="/addreminder"
              element={<div><AddReminder/></div>}/>

            <Route path="/reminders/:id" element={<ReminderDetail />} />
          </Routes>
        }
        
      </div>
    </Router>
    </UserProvider>
  )
}
export default App
