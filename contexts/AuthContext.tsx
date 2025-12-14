import React, { createContext, ReactNode, useContext, useState } from 'react';

export type UserType = 'student' | 'librarian' | null;

interface AuthContextType {
  userType: UserType;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userType, setUserType] = useState<UserType>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('userType');
    return (saved as UserType) || null;
  });

  const login = (username: string) => {
    // Phân biệt user type dựa trên username
    const type: UserType =
      username.toLowerCase() === 'librarian' ? 'librarian' : 'student';
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setUserType(null);
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
