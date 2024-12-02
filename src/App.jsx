import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import LearnMore from "./components/LearnMore";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Reminders from './pages/Reminders';
import AddReminder from './components/AddReminder';
import ReminderDetail from './pages/ReminderDetail';


const App = () => {

  return (
    <UserProvider>
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/learn" element={<LearnMore />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reminders" element={<Reminders />} /> 
            <Route path="/addreminder" element={<div><AddReminder/></div>}/>
            <Route path="/reminders/:id" element={<ReminderDetail />} />
          </Routes>
      </div>
    </Router>
    </UserProvider>
  )
}
export default App
