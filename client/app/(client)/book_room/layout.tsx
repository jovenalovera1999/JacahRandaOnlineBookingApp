import { Metadata } from "next";
import BookRoomPage from "./page";

export const metadata: Metadata = {
  title: "Book Room",
};

export default function BookRoomLayout() {
  return (
    <>
      <BookRoomPage />
    </>
  );
}
