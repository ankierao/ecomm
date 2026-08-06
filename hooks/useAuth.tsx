"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AUTH_KEY = "shopsphere-auth";

const VALID_CREDENTIALS = {
  email: "ankit@email.com",
  password: "12345",
  name: "Ankit",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, [user, mounted]);

  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      setUser({
        name: VALID_CREDENTIALS.name,
        email: VALID_CREDENTIALS.email,
      });
      setIsLoginOpen(false);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoginOpen, openLogin, closeLogin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
