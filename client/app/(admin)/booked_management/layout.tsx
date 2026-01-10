import { Metadata } from "next";
import BookedManagementPage from "./page";

export const metadata: Metadata = {
  title: "Booked Management",
};

export default function BookedManagementLayout() {
  return (
    <>
      <BookedManagementPage />
    </>
  );
}
