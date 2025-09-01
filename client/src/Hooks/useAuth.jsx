import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

// 1. Create the Authentication Context
const AuthContext = createContext(null);

// 2. Create and export the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create and export the Provider Component
export const AuthProvider = ({ children }) => {
  // Hardcode a mock user object to simulate being logged in.
  const [user, setUser] = useState({ username: "TestUser", id: "007" });

  // Dummy functions for login and logout.
  const login = () => console.log("Login function is mocked.");
  const logout = () => setUser(null);

  // The value provided to the context. Loading is always false.
  const value = {
    user,
    loading: false,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// A component to protect routes for authenticated users
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return children;
};