import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import { RemindersProvider } from "./contexts/RemindersContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Reminders from './pages/Reminders';
import ReminderDetail from './pages/ReminderDetail';
import RemindersCompleted from './pages/RemindersCompleted';


const App = () => {

  return (
    <UserProvider>
      <RemindersProvider>
      <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reminders" element={<Reminders />} /> 
            <Route path="/reminders/completed" element={<RemindersCompleted />} />
            <Route path="/reminders/:id" element={<ReminderDetail />} />
          </Routes>
      </div>
      </Router>
      </RemindersProvider>
    </UserProvider>
  )
}
export default App
