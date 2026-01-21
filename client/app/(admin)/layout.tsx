"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/shared/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <AuthProvider>
        <ProtectedRoute>
          <Sidebar>{children}</Sidebar>
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
