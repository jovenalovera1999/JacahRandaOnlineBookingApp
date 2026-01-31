import { Metadata } from "next";
import BookedManagementPage from "./page";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booked Management",
};

interface BookedManagementLayoutProps {
  children: ReactNode;
}

export default function BookedManagementLayout({
  children,
}: BookedManagementLayoutProps) {
  return <>{children}</>;
}
