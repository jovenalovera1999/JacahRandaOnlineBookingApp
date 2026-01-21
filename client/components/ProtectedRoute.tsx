import { useAuth } from "@/context/AuthContext";
import Spinner from "./ui/Spinner";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
