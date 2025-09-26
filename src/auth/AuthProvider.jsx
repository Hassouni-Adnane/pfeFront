import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // user info (includes id)
  const [userId, setUserId] = useState(null); 
  const [token, setToken] = useState(null);    // if you add JWT later

  // Restore session on refresh
  useEffect(() => {
    const saved = localStorage.getItem("auth:user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  // AuthProvider.jsx
  useEffect(() => {
    if (user != null) setUserId(user.id);
    else setUserId(null);
  }, [user]);


  // ------------------ LOGIN ------------------
  const login = async (credentials) => {
    const payload = {
      email: String(credentials.email || "").trim().toLowerCase(),
      password: credentials.password,
    };

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Erreur de connexion");
    }

    // backend returns { message, user } OR just { id, email, role, ... }
    const u = data.user ?? data;
    setUser(u);
    setUserId(u.id);
    
    return u;
  };

  const register = async ({ name, email, jobTitle, password }) => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, jobTitle, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Inscription échouée");
    return data;
  };

  const isAdmin = () => user?.role === "admin";

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth:user");
    localStorage.removeItem("auth:token");
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        userId,      // ✅ now accessible
        login,
        register,
        isAdmin,
        logout,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
