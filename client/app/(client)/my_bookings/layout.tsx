import { Metadata } from "next";
import MyBookingsPage from "./page";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Bookings",
};

interface MyBookingsLayoutProps {
  children: ReactNode;
}

export default function MyBookingsLayout({ children }: MyBookingsLayoutProps) {
  return <>{children}</>;
}
