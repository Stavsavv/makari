import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - replace with real backend later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: accept any email with password "demo123"
    // Admin login: email contains "admin" and password "admin123"
    let role: UserRole = "user";
    if (email.toLowerCase().includes("admin") && password === "admin123") {
      role = "admin";
    } else if (password !== "demo123") {
      setIsLoading(false);
      return false;
    }
    
    const userData: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split("@")[0],
      role,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoading(false);
    return true;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - replace with real backend later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: new users are regular users, not admins
    const userData: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: "user",
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login, 
        register, 
        logout,
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
