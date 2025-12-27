import { Metadata } from "next";
import MyBookingsPage from "./page";

export const metadata: Metadata = {
  title: "My Bookings",
};

export default function MyBookingsLayout() {
  return (
    <>
      <MyBookingsPage />
    </>
  );
}
