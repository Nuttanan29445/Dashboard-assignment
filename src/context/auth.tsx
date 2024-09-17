import React, { createContext, useState, useEffect, ReactNode } from "react";
import { user } from "../data/loginUser";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUser = user;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUsername(user);
    }
  }, []);

  const signIn = (username: string, password: string) => {
    if (username === mockUser.username && password === mockUser.password) {
      localStorage.setItem("user", JSON.stringify(mockUser.name));
      setIsAuthenticated(true);
      setUsername(mockUser.name);
      return true;
    }
    return false;
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
