import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, LoginCredentials } from "../types/Auth";
import { login as loginService, register as registerService } from "../services/authService"

// Create context for authentication 
const AuthContext = createContext<AuthContextType | null>(null);

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider for authentication
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setUser({ displayName: "User" }); 
    }
  }, []);

  // Log in a user
  const login = async (credentials: LoginCredentials) => {
    // Call backend login endpoint through authService
    const data = await loginService(credentials.email, credentials.password);
    // Save JWT in localStorage
    localStorage.setItem("jwtToken", data.token);
    // Update user state with name from backend
    setUser({ displayName: data.displayName });
  };

  // Register user
  const register = async (credentials: LoginCredentials & { displayName: string }) => {
    // Call backend register through authService
    const data = await registerService(credentials.email, credentials.password, credentials.displayName);
    // Save JWT in localStorage
    localStorage.setItem("jwtToken", data.token);
    // Update user state with name from backend
    setUser({ displayName: data.displayName });
  };

  // Function to log out user by removing JWT
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  // Authentication state and actions to child components
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}