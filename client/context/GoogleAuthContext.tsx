"use client";

import getCsrfCookie from "@/hooks/useGetCsrfCookie";
import { useToastMessage } from "@/hooks/useToastMessage";
import { UserColumns } from "@/interfaces/UserInterface";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
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

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  // States
  const [user, setUser] = useState<UserColumns | null>(null);
  const [loading, setLoading] = useState(false);

  // Hooks
  const router = useRouter();
  const { showToastMessage } = useToastMessage();

  const handleLoadAuthenticatedUser = useCallback(async () => {
    try {
      setLoading(true);

      await getCsrfCookie();
      const { status, data } = await api.get("/auth/google/me");

      console.log(data.user);

      if (status !== 200) {
        console.error(
          "Unexpected status error during load authenticated user at GoogleAuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(data.user);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setUser(null);
        return;
      }

      console.error(
        "Unexpected server error during load authenticated user at GoogleAuthContext.tsx: ",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await getCsrfCookie();
      const { status, data } = await api.post("/auth/google/logout");

      if (status !== 200) {
        console.error(
          "Unexpected status error during logout at GoogleAuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(null);
      showToastMessage("success", data.message);

      router.push("/");
    } catch (error) {
      console.error(
        "Unexpected server error during logout at GoogleAuthContext.tsx: ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadAuthenticatedUser();
  }, [handleLoadAuthenticatedUser]);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useGoogleAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within an GoogleAuthProvider");
  return context;
};
