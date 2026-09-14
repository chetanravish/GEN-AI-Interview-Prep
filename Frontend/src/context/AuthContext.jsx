import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
      console.log("AuthProvider rendering", AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // GET /api/auth/get-me — relies on the "token" cookie, so this is how
  // we detect an existing session on page load / refresh.
  async function checkAuth() {
    try {
      const res = await api.get("/get-me");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const res = await api.post("/login", { email, password });
    setUser(res.data.user);
    return res.data;
  }

  // Backend only creates the account; it does not log the user in
  // (no cookie is set on /register), so callers should route to /login next.
  async function register(username, email, password) {
    const res = await api.post("/register", { username, email, password });
    return res.data;
  }

  async function logout() {
    await api.get("/logout");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "useAuth() was called outside an <AuthProvider>. Make sure the component " +
        "using useAuth (directly or via a parent) is rendered inside <AuthProvider> " +
        "in main.jsx, and that you don't have two copies of React installed."
    );
  }
  return ctx;
}