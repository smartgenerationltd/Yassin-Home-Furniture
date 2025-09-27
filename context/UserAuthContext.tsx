import React, { createContext, useContext, ReactNode, useState } from 'react';
import { CONTACT_INFO } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';

export interface UserProfile {
  email: string;
  name: string;
  // FIX: Add optional 'picture' property to align with its usage in Header.tsx.
  picture?: string;
}

interface AdminAccount extends UserProfile {
  passwordHash: string; // In a real app, this would be a securely hashed password
}

interface UserAuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminSignUp: (name: string, email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => void;
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

const initialAdminAccount: AdminAccount = {
    email: CONTACT_INFO.adminEmail,
    name: 'Admin',
    passwordHash: 'admin123' // Storing plain text for demo purposes only.
};

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(getSessionUser);
  const [adminAccounts, setAdminAccounts] = useLocalStorage<AdminAccount[]>('adminAccounts', [initialAdminAccount]);

  const adminSignUp = async (name: string, email: string, password: string): Promise<{success: boolean, message: string}> => {
    const existingUser = adminAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: AdminAccount = {
        name,
        email,
        passwordHash: password // In a real app, hash and salt the password here
    };

    setAdminAccounts([...adminAccounts, newUser]);
    return { success: true, message: 'Account created successfully! Please log in.' };
  };
  
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    const account = adminAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    
    if (account && account.passwordHash === password) { // And compare hashed passwords here
      const userProfile: UserProfile = {
        email: account.email,
        name: account.name,
      };
      sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
      setUser(userProfile);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    sessionStorage.removeItem('userProfile');
    setUser(null);
    window.location.href = '/#/admin/login';
  };

  const isAuthenticated = !!user;

  const value = { user, isAuthenticated, adminLogin, logout, adminSignUp };

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