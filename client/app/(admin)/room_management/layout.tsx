import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Room Management",
};

interface RoomManagementLayoutProps {
  children: ReactNode;
}

export default function RoomManagementLayout({
  children,
}: RoomManagementLayoutProps) {
  return <>{children}</>;
}
