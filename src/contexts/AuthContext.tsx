/* eslint-disable react-refresh/only-export-components */

import React,
{
  createContext,
  useState,
  useContext
} from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'customer' | 'employee';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    return localStorage.getItem('userRole') as UserRole | null;
  });
  const navigate = useNavigate();



  const login = (token: string, role: UserRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    if (role == 'customer') {
      setUserRole(role);
      navigate('buy-car');
    }
    else if (role == 'employee') {
        setUserRole(role);
        navigate('admin');
      }
    }




  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};