import { createContext, useContext } from 'react';

export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  wasAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  wasAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);