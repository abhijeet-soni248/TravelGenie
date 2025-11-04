import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    const newUser = {
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

  const updateUser = (userData) => {
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