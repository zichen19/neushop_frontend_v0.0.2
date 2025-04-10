import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user session (e.g., from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'https://db-group5-452710.wl.r.appspot.com/login',
        { username, password }
      );
  
      console.log('Login response data:', response.data);
  
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData.user || userData.user_id; // ✅ this is the fix!
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
    // Optionally, you might want to call a logout API endpoint here
  };

  const contextValue = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};