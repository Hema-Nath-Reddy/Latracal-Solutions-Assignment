import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../store/movieSlice";

// 1. Create the Authentication Context
const AuthContext = createContext(null);

// 2. Create and export the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create and export the Provider Component
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const resultAction = await dispatch(logIn({ email, password }));

      if (logIn.fulfilled.match(resultAction)) {
        // Check if the response contains user data
        const userData = resultAction.payload.user;

        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } else {
          // Handle case where login was successful but no user data returned
          console.error("Login successful but no user data received");
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        // Login failed
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // This useEffect restores the user session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
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
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return children;
};
