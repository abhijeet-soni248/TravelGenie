import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  travelStyle?: string;
  profileImage?: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: User | null;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || Date.now().toString(),
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone,
      travelStyle: userData.travelStyle,
      profileImage: userData.profileImage,
      isLoggedIn: true
    };
    setUser(newUser);
    localStorage.setItem("travelgenie_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("travelgenie_user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("travelgenie_user", JSON.stringify(updatedUser));
    }
  };

  // Load user from localStorage on initialization
  useState(() => {
    const savedUser = localStorage.getItem("travelgenie_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user data:", error);
      }
    }
  });

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}