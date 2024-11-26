import { createContext, useState, useEffect } from "react";
import axios from "../axiosConfig";

export const UserContext = createContext();

// Exportación por defecto para el proveedor del contexto
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
          console.error("Error al obtener el usuario:", error);
          setUser(null); // Asegura que `user` se establezca como null en caso de error
        }
      } else {
        setUser(null); // Si no hay token, establece `user` en null
      }
      setLoading(false);
    };

    fetchUser();
  }, []); // Corre una vez al cargar el contexto

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; 