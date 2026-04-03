import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe, loginUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!token && !user; 
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
    const token = localStorage.getItem("token");
    if (token) {
      getMe().then(userData => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }).catch(() => {
       
      });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      const { token, ...userData } = data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
