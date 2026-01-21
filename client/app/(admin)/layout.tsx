"use client";

import AuthGuard from "@/components/AuthGuard";
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
        <AuthGuard />
        <Sidebar>{children}</Sidebar>
      </AuthProvider>
    </>
  );
}
