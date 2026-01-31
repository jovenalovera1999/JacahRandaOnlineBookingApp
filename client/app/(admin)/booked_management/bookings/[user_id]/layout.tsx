import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Bookings",
};

interface BookingsLayoutProps {
  children: ReactNode;
}

export default function BookingsLayout({ children }: BookingsLayoutProps) {
  return <>{children}</>;
}
