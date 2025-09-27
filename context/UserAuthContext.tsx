import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CONTACT_INFO } from '../constants';

export interface UserProfile {
  email: string;
  name: string;
  picture?: string;
}

interface UserAuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  handleLoginSuccess: (credentialResponse: any) => void;
  logout: () => void;
  isAdmin: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const getSessionUser = (): UserProfile | null => {
  const userJson = sessionStorage.getItem('userProfile');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(getSessionUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.email === CONTACT_INFO.adminEmail);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLoginSuccess = (credentialResponse: any) => {
    try {
      const decoded: UserProfile = jwtDecode(credentialResponse.credential);
      sessionStorage.setItem('userProfile', JSON.stringify(decoded));
      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode token or set user", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('userProfile');
    setUser(null);
    window.location.href = '/#/login';
  };

  const isAuthenticated = !!user;

  const value = { user, isAuthenticated, handleLoginSuccess, logout, isAdmin };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = (): UserAuthContextType => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
