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
        'https://db-group5-452710.wl.r.appspot.com/login', // Replace with your login API endpoint
        { username, password }
      );

      const userData = response.data; // Assuming your API returns user data on successful login
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propagate the error to the component
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