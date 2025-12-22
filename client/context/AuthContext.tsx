"use client";

import { UserColumns } from "@/interfaces/UserInterface";
import api from "@/lib/axios";
import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: UserColumns | null;
  loading: boolean;
  handleLogout: (e: FormEvent) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserColumns | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLoadAuthenticatedUser = useCallback(async () => {
    try {
      setLoading(true);

      const { status, data } = await api.get("/auth/me");

      if (status !== 200) {
        console.error(
          "Unexpected status error during load authenticated user at AuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error(
        "Unexpected server error during load authenticated user at AuthContext.tsx: ",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = async (e: FormEvent) => {
    try {
      e.preventDefault();

      setLoading(true);

      const { status, data } = await api.post("/auth/logout");

      if (status !== 200) {
        console.error(
          "Unexpected status error during logout at AuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error(
        "Unexpected server error during logout at AuthContext.tsx: ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadAuthenticatedUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
