"use client";

import Navbar from "@/components/shared/navbar/Navbar";
import BookRoomModal from "@/features/home/BookRoomModal";
import RoomList from "@/features/home/RoomList";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useState } from "react";

export default function Home() {
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
      <Navbar />
      <div className="pt-4 pb-4">
        <BookRoomModal
          selectedRoom={selectedRoom}
          isOpen={isBookRoomModalOpen}
          onClose={closeBookRoomModal}
        />
        <RoomList onBookRoom={openBookRoomModal} />
      </div>
    </>
  );
}
