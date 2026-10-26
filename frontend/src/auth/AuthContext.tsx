import { createContext, useContext } from 'react';

// ✅ Added 'staff' and 'finance' here
export type UserRole = 'user' | 'admin' | 'staff' | 'finance';

export interface User {
  user_id: number;
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