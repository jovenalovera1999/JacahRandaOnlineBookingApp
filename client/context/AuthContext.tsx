"use client";

import getCsrfCookie from "@/hooks/useGetCsrfCookie";
import { useToastMessage } from "@/hooks/useToastMessage";
import { LoginFieldsErrors, UserColumns } from "@/interfaces/UserInterface";
import api from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: UserColumns | null;
  isLoading: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
  errors: LoginFieldsErrors;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { showToastMessage } = useToastMessage();

  const [user, setUser] = useState<UserColumns | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<LoginFieldsErrors>({});

  const handleLoadUser = useCallback(async () => {
    try {
      setIsLoading(true);

      await getCsrfCookie();
      const { status, data } = await api.get("/auth/me");

      if (status !== 200) {
        console.error(
          "Unexpected status error during load user at AuthContext.tsx: ",
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
        "Unexpected server error during load user at AuthContext.tsx: ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);

      await getCsrfCookie();
      const { status, data } = await api.post("/auth/login", {
        username,
        password,
      });

      if (status !== 200) {
        console.error(
          "Unexpected status error during login user at AuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(data.user);

      router.push("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showToastMessage("failed", error.response.data.message);
        setErrors({});

        return;
      } else if (error.response && error.response.status != 422) {
        console.error(
          "Unexpected server error during login user at AuthContext.tsx: ",
          error
        );
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await getCsrfCookie();
      const { status, data } = await api.post("/auth/logout");

      if (status !== 200) {
        console.error(
          "Unexpected status error during logout user at AuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(null);

      showToastMessage("success", data.message);
      router.push("/login");
    } catch (error) {
      console.error(
        "Unexpected server error during logout user at AuthContext.tsx: ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pathname === "/login") {
      setIsLoading(false);
      return;
    }

    handleLoadUser();
  }, [pathname, handleLoadUser]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleLogin, handleLogout, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
