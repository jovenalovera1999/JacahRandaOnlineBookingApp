"use client";

import BookRoomModal from "@/features/book_room/BookRoomModal";
import RoomList from "@/features/book_room/RoomList";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useState } from "react";

export default function BookRoomPage() {
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
      <div className="pt-4 pb-4">
        <BookRoomModal
          selectedRoom={selectedRoom}
          isOpen={isBookRoomModalOpen}
          onBookingAdded={(status, message) =>
            showToastMessage(status, message)
          }
          onReloadAvailableRooms={handleReload}
          onClose={closeBookRoomModal}
        />
        <RoomList
          onBookRoom={openBookRoomModal}
          reloadAvailableRooms={reload}
        />
      </div>
    </>
  );
}
