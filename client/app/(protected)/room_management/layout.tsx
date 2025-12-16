import { Metadata } from "next";
import RoomManagementPage from "./page";

export const metadata: Metadata = {
  title: "Room Management",
};

export default async function RoomManagementLayout() {
  return (
    <>
      <RoomManagementPage />
    </>
  );
}
