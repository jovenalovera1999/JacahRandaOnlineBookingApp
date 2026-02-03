import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order Management",
};

interface OrderManagementLayoutProps {
  children: ReactNode;
}

export default function OrderManagementLayout({
  children,
}: OrderManagementLayoutProps) {
  return <>{children}</>;
}
