import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "User Management",
};

interface UserManagementLayoutProps {
  children: ReactNode;
}

export default function UserManagementLayout({
  children,
}: UserManagementLayoutProps) {
  return <>{children}</>;
}
