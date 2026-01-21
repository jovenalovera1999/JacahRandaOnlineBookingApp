"use client";

import Activities from "@/features/landing_page/Activities";
import BookRoomModal from "@/features/landing_page/BookRoomModal";
import RoomList from "@/features/landing_page/RoomList";
import About from "@/features/landing_page/about";
import Foods from "@/features/landing_page/foods";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { showToastMessage } = useToastMessage();
  const { reload, handleReload } = useReload();

  const [selectedRoom, setSelectedRoom] = useState<RoomColumns | null>(null);
  const [isBookRoomModalOpen, setIsBookRoomModalOpen] = useState(false);

  const openBookRoomModal = (roomSelected: RoomColumns | null) => {
    setSelectedRoom(roomSelected);
    setIsBookRoomModalOpen(true);
  };

  const closeBookRoomModal = () => {
    setSelectedRoom(null);
    setIsBookRoomModalOpen(false);
  };

  // const searchParams = useSearchParams();
  const hash = window.location.hash;

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash]);

  // const scrollTo = searchParams.get("scroll");

  // useEffect(() => {
  //   if (scrollTo) {
  //     const element = document.getElementById(scrollTo);
  //     if (element) element.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [scrollTo]);

  return (
    <>
      <About id="about" />
      <Foods id="foods" />
      <Activities id="activities" />

      <BookRoomModal
        selectedRoom={selectedRoom}
        isOpen={isBookRoomModalOpen}
        onBookingAdded={(status, message) => showToastMessage(status, message)}
        onReloadAvailableRooms={handleReload}
        onClose={closeBookRoomModal}
      />

      <RoomList
        id="room_list"
        onBookRoom={openBookRoomModal}
        reloadAvailableRooms={reload}
      />
    </>
  );
}
