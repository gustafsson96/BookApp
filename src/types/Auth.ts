// Minimal user info stored in frontend
export interface User {
    displayName: string;
  }
  
  // Payload for login
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  // Response from backend after login/register
  export interface AuthRes {
    token: string;
    displayName: string;
  }
  
  // Context type
  export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: LoginCredentials & { displayName: string }) => Promise<void>;
    logout: () => void;
  }