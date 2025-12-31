import { UserColumns } from "@/interfaces/UserInterface";
import api from "@/lib/axios";
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
  handleRefreshToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserColumns | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const { status, data } = await api.get("/auth/me");

      if (status !== 200) {
        console.error(
          "Unexpected status error during load user at AuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(data.user);
    } catch (error) {
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
    } catch (error) {
      console.error(
        "Unexpected server error during login user at AuthContext.tsx: ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      const { status, data } = await api.post("/auth/logout");

      if (status !== 200) {
        console.error(
          "Unexpected status error during logout user at AuthContext.tsx: ",
          status
        );
        return;
      }

      setUser(null);
    } catch (error) {
      console.error(
        "Unexpected server error during logout user at AuthContext.tsx: ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    try {
      setIsLoading(true);

      const { status } = await api.post("/auth/refresh");

      if (status !== 200) {
        console.error(
          "Unexpected status error during refresh user token at AuthContext.tsx: ",
          status
        );
        return;
      }

      await handleLoadUser();
    } catch (error) {
      console.error(
        "Unexpected server error during refresh user token at AuthContext.tsx: ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleLogin, handleLogout, handleRefreshToken }}
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
