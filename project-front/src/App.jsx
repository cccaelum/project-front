import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Reminders from './Reminders';
import AddReminder from './AddReminder';
import ReminderDetail from './ReminderDetail';

import './App.css'

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
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          <br></br>
          <Link to="/reminders">Agregar recordatorio</Link>
        </nav>
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Reminders data={data} />} />

            <Route
              path="/reminders"
              element={<div><AddReminder/></div>}/>

            <Route path="/reminders/:id" element={<ReminderDetail />} />
          </Routes>
        }
        
      </div>
    </Router>
  )
}
export default App
