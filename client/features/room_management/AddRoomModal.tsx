"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { RoomStatusColumns } from "@/interfaces/RoomStatusInterface";
import { RoomTypeColumns } from "@/interfaces/RoomTypeInterface";
import RoomService from "@/services/RoomService";
import { useCallback, useEffect, useState } from "react";

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRoomModal({ isOpen, onClose }: AddRoomModalProps) {
  const [roomTypes, setRoomTypes] = useState<RoomTypeColumns[]>([]);
  const [roomStatuses, setRoomStatuses] = useState<RoomStatusColumns[]>([]);

  const handleLoadRoomTypes = useCallback(async () => {
    try {
      const { status, data } = await RoomService.loadRoomReferences();

      if (status !== 200) {
        console.error("Unexpected status error during add room type: ", status);
        return;
      }

      setRoomTypes(data.roomTypes);
      setRoomStatuses(data.roomStatuses);
    } catch (error) {
      console.error("Unexpected server error during add room type: ", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) handleLoadRoomTypes();
  }, [isOpen]);

  return (
    <>
      <Modal title="Add Room" isOpen={isOpen} onClose={onClose}>
        {roomTypes.length <= 0 && roomStatuses.length <= 0 ? (
          <>
            <div className="flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 md:space-x-4 border-b border-gray-100 pb-4 mb-4">
              <div className="md:col-span-1 space-y-4">
                <FloatingLabelInputField
                  label="Title"
                  type="text"
                  name="title"
                  required
                  autoFocus
                />
                <FloatingLabelTextareaField
                  label="Description"
                  name="description"
                />
              </div>
              <div className="md:col-span-1 space-y-4">
                <FloatingLabelSelectField
                  label="Room Type"
                  name="room_type"
                  required
                >
                  {roomTypes.map((roomType) => (
                    <option
                      value={roomType.room_type_id}
                      key={roomType.room_type_id}
                    >
                      {roomType.room_type}
                    </option>
                  ))}
                </FloatingLabelSelectField>
                <FloatingLabelInputField
                  label="Price"
                  type="text"
                  name="price"
                  required
                />
                <FloatingLabelSelectField
                  label="Room Status"
                  name="room_status"
                >
                  {roomStatuses.map((roomStatus) => (
                    <option
                      value={roomStatus.room_status_id}
                      key={roomStatus.room_status_id}
                    >
                      {roomStatus.room_status}
                    </option>
                  ))}
                </FloatingLabelSelectField>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="col-span-2 md:col-span-1">
                <Button
                  tag="button"
                  onClick={onClose}
                  className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100 focus:ring-0"
                >
                  Close
                </Button>
              </div>
              <div className="col-span-2 md:col-span-1">
                <Button tag="button">Save Room</Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
