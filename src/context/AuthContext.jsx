import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pos-user");
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    // normalize role
    return {
      ...parsed,
      role: parsed.role?.toLowerCase() || "staff",
    };
  });

  const login = (userData) => {
    const normalized = {
      ...userData,
      role: userData.role?.toLowerCase() || "staff",
    };

    setUser(normalized);
    localStorage.setItem("pos-user", JSON.stringify(normalized));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pos-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
