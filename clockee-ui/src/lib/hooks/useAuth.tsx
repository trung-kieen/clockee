"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthManager } from "../auth/AuthManager";


const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(AuthManager.getAccessToken());
  useEffect(() => {


    // TODO: get token from refresh token for first time

    // Callback for notify change token in AuthManager
    const handleTokenChange = (newToken: string) => {
      setToken(newToken);
    }

    AuthManager.addListener(handleTokenChange);
    setToken(AuthManager.getAccessToken());


    return () => {
      // Destroy listener when component is umnount
      AuthManager.removeListener(handleTokenChange);
    }
  }, [])

  const updateToken = (token: string) => {
    AuthManager.setAccessToken(token);
  }
  const isLogin = (): boolean => {
    return token != null && token.length > 0;
  }

  const clearToken = () => {
    AuthManager.clearAccessToken();
  }

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken, clearToken, isLogin }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
