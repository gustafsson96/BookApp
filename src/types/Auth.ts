export interface User {
  displayName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: LoginCredentials & { displayName: string }) => Promise<void>;
  logout: () => void;
}