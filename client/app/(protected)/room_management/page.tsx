"use client";

import AddRoomModal from "@/features/room_management/AddRoomModal";
import DeleteRoomModal from "@/features/room_management/DeleteRoomModal";
import EditRoomModal from "@/features/room_management/EditRoomModal";
import RoomsTable from "@/features/room_management/RoomsTable";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useState } from "react";

export default function RoomManagementPage() {
  // Hooks
  const { showToastMessage } = useToastMessage();
  const { reload, handleReload } = useReload();

  // States
  const [selectedRoom, setSelectedRoom] = useState<RoomColumns | null>(null);

  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isEditRoomModalOpen, setIsEditRoomModalOpen] = useState(false);
  const [isDeleteRoomModalOpen, setIsDeleteRoomModalOpen] = useState(false);

  // Functions for edit room modal
  const handleOpenEditRoomModal = (roomSelected: RoomColumns | null) => {
    setSelectedRoom(roomSelected);
    setIsEditRoomModalOpen(true);
  };

  const handleCloseEditRoomModal = () => {
    setSelectedRoom(null);
    setIsEditRoomModalOpen(false);
  };

  // Functions for delete room modal
  const handleOpenDeleteRoomModal = (roomSelected: RoomColumns | null) => {
    setSelectedRoom(roomSelected);
    setIsDeleteRoomModalOpen(true);
  };

  const handleCloseDeleteRoomModal = () => {
    setSelectedRoom(null);
    setIsDeleteRoomModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Room Management
      </h1>
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        reloadRoomReferences={reload}
        onRoomAdded={(status, message) => showToastMessage(status, message)}
        onReloadRooms={handleReload}
        onClose={() => setIsAddRoomModalOpen(false)}
      />
      <EditRoomModal
        selectedRoom={selectedRoom}
        isOpen={isEditRoomModalOpen}
        reloadRoomReferences={reload}
        onRoomUpdated={(status, message) => showToastMessage(status, message)}
        onReloadRooms={handleReload}
        onClose={handleCloseEditRoomModal}
      />
      <DeleteRoomModal
        selectedRoom={selectedRoom}
        isOpen={isDeleteRoomModalOpen}
        onRoomDeleted={(status, message) => showToastMessage(status, message)}
        onReloadRooms={handleReload}
        onClose={handleCloseDeleteRoomModal}
      />
      <RoomsTable
        onAddRoom={() => setIsAddRoomModalOpen(true)}
        onEditRoom={(room) => handleOpenEditRoomModal(room)}
        onDeleteRoom={(room) => handleOpenDeleteRoomModal(room)}
        reloadRooms={reload}
      />
    </>
  );
}
