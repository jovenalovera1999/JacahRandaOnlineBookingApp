"use client";

import AddRoomModal from "@/features/room_management/AddRoomModal";
import RoomsTable from "@/features/room_management/RoomsTable";
import useRooms from "@/hooks/useRooms";
import { useToastMessage } from "@/hooks/useToastMessage";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { RoomStatusColumns } from "@/interfaces/RoomStatusInterface";
import { RoomTypeColumns } from "@/interfaces/RoomTypeInterface";
import { useState } from "react";

interface RoomManagementPageProps {
  rooms: RoomColumns[];
  roomTypes: RoomTypeColumns[];
  roomStatuses: RoomStatusColumns[];
}

export default function RoomManagementPage({
  rooms,
  roomTypes,
  roomStatuses,
}: RoomManagementPageProps) {
  const { showToastMessage } = useToastMessage();

  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Room Management
      </h1>
      <RoomsTable rooms={rooms} onAddRoom={() => setIsAddRoomModalOpen(true)} />
      <AddRoomModal
        roomTypes={roomTypes}
        roomStatuses={roomStatuses}
        isOpen={isAddRoomModalOpen}
        onRoomAdded={(status, message) => showToastMessage(status, message)}
        onClose={() => setIsAddRoomModalOpen(false)}
      />
    </>
  );
}
