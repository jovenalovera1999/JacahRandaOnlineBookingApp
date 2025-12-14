"use client";

import ToastMessage from "@/components/ui/ToastMessage";
import AddRoomModal from "@/features/room_management/AddRoomModal";
import RoomsTable from "@/features/room_management/RoomsTable";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useCallback, useState } from "react";

export default function RoomManagementPage() {
  const { showToastMessage } = useToastMessage();

  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Room Management
      </h1>
      <RoomsTable onAddRoom={() => setIsAddRoomModalOpen(true)} />
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onRoomAdded={(status, message) => showToastMessage(status, message)}
        onClose={() => setIsAddRoomModalOpen(false)}
      />
    </>
  );
}
