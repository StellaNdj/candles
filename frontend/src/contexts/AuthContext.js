import { createContext, useEffect, useState } from "react";
import { fetchUserDetails } from "../endpoints";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');

      // Only fetch user data if the token exists
      if (token) {
        try {
          const userDetails = await fetchUserDetails({ token });
          setUser(userDetails);
        } catch (error) {
          console.log('Error while fetching user data for context:', error);
        }
      }
      setLoading(false)
    };

    fetchUserData();
  }, [])

  const login = (token) => {
    localStorage.setItem('accessToken', token);
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;
