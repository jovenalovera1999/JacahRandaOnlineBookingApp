"use client";

import AddRoomModal from "@/components/layouts/room_management/AddRoomModal";
import RoomsTable from "@/components/layouts/room_management/RoomsTable";
import { useState } from "react";

export default function RoomManagementPage() {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Room Management
      </h1>
      <RoomsTable onAddRoom={() => setIsAddRoomModalOpen(true)} />
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
      />
    </>
  );
}
