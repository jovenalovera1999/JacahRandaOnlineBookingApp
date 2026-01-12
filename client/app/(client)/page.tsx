"use client";

import BookRoomModal from "@/features/book_room/BookRoomModal";
import RoomList from "@/features/book_room/RoomList";
import About from "@/features/landing_page/about";
import Foods from "@/features/landing_page/foods";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useState } from "react";

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

  return (
    <>
      <About />
      <Foods />
      <BookRoomModal
        selectedRoom={selectedRoom}
        isOpen={isBookRoomModalOpen}
        onBookingAdded={(status, message) => showToastMessage(status, message)}
        onReloadAvailableRooms={handleReload}
        onClose={closeBookRoomModal}
      />
      <RoomList onBookRoom={openBookRoomModal} reloadAvailableRooms={reload} />
    </>
  );
}
