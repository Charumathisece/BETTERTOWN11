import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // We might need axios later for fetching user data

// Create Context Object
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize token from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Set initial auth state based on token
  const [user, setUser] = useState(null); // We can add user details later
  const [loading, setLoading] = useState(true); // To handle initial check

  // Effect to check token validity or fetch user data when token changes or on initial load
  useEffect(() => {
    if (token) {
      // Optional: Validate token with backend or fetch user details
      // For now, we just assume the token means authenticated
      localStorage.setItem('token', token); // Ensure token is in localStorage
      setIsAuthenticated(true);
      // Example: Fetch user data based on token
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // axios.get('/api/auth/user') // Assuming you have an endpoint to get user data
      //   .then(res => setUser(res.data))
      //   .catch(() => {
      //     logout(); // Token invalid or expired
      //   })
      //   .finally(() => setLoading(false));
      setLoading(false); // For now, just stop loading
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      // delete axios.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token]); // Re-run this effect if the token state changes

  // Login handler
  const login = (newToken) => {
    setToken(newToken); // Update the token state, which triggers the useEffect
  };

  // Logout handler
  const logout = () => {
    setToken(null); // Clear the token state, which triggers the useEffect
    window.dispatchEvent(new Event('auth-change'));
  };

  // Provide the state and functions to children components
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, user, login, logout, loading }}>
      {!loading && children} {/* Render children only when initial loading is done */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
