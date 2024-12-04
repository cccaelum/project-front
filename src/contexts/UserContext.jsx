import { createContext, useState, useEffect } from "react";
import axios from "../axiosConfig";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.get("https://remindme-6w8d.onrender.com/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error getting user:", error);
          setUser(null); 
        }
      } else {
        setUser(null); 
      }
      setLoading(false);
    };

    fetchUser();
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; 