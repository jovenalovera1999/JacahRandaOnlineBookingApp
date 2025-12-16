"use client";

import AddRoomModal from "@/features/room_management/AddRoomModal";
import RoomsTable from "@/features/room_management/RoomsTable";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { RoomStatusColumns } from "@/interfaces/RoomStatusInterface";
import { RoomTypeColumns } from "@/interfaces/RoomTypeInterface";
import { useState } from "react";

export default function RoomManagementPage() {
  // Hooks
  const { showToastMessage } = useToastMessage();
  const { reload, handleReload } = useReload();

  // States
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Room Management
      </h1>
      <RoomsTable
        onAddRoom={() => setIsAddRoomModalOpen(true)}
        reloadRooms={reload}
      />
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onRoomAdded={(status, message) => showToastMessage(status, message)}
        onReloadRooms={handleReload}
        onClose={() => setIsAddRoomModalOpen(false)}
      />
    </>
  );
}
