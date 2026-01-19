import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { RoomColumns } from "@/interfaces/RoomInterface";
import RoomService from "@/services/RoomService";
import { FormEvent, useEffect, useState } from "react";

interface DeleteRoomModalProps {
  selectedRoom: RoomColumns | null;
  isOpen: boolean;
  onRoomDeleted: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadRooms: () => void;
  onClose: () => void;
}

export default function DeleteRoomModal({
  selectedRoom,
  isOpen,
  onRoomDeleted,
  onReloadRooms,
  onClose,
}: DeleteRoomModalProps) {
  const [isDestroying, setIsDestroying] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [existingRoomImage, setExistingRoomImage] = useState<string | null>(
    null
  );
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [description, setDescription] = useState("");

  const handleDestroyRoom = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsDestroying(true);

      const { status, data } = await RoomService.destroyRoom(roomId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during destroy room at DeleteRoomModal.tsx: ",
          data
        );
        return;
      }

      onRoomDeleted("success", data.message);
      onReloadRooms();

      onClose();
    } catch (error) {
      console.error(
        "Unexpected server error during destroy room at DeleteRoomModal.tsx: ",
        error
      );
    } finally {
      setIsDestroying(false);
    }
  };

  useEffect(() => {
    if (selectedRoom && isOpen) {
      setRoomId(selectedRoom.room_id);
      setExistingRoomImage(selectedRoom.room_image ?? null);
      setRoomNo(selectedRoom.room_no);
      setRoomType(selectedRoom.room_type.room_type);
      setPrice(selectedRoom.price);
      setRoomStatus(selectedRoom.room_status.room_status);
      setDescription(selectedRoom.description ?? "");
    }
  }, [selectedRoom, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setRoomId(0);
      setExistingRoomImage(null);
      setRoomNo("");
      setRoomType("");
      setPrice("");
      setRoomStatus("");
      setDescription("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal title="Delete Room" isOpen={isOpen} onClose={onClose}>
        {/* Upload field */}
        <Form onSubmit={handleDestroyRoom}>
          <div className="mb-5 w-full">
            <UploadField
              label="Room Image"
              labelFile="PNG, JPG or JPEG"
              name="room_image"
              alt="Room Image"
              existingFileUrl={existingRoomImage}
              readOnly
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4 mb-4">
            {/* Room no, room type, price and room status fields */}
            <div className="col-span-2 md:col-span-1 w-full">
              <div className="mb-5">
                <FloatingLabelInputField
                  label="Room No."
                  type="text"
                  name="room_no"
                  value={roomNo}
                  readOnly
                />
              </div>
              <div className="">
                <FloatingLabelInputField
                  label="Room Type"
                  type="text"
                  name="room_type"
                  value={roomType}
                  readOnly
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 w-full">
              <div className="mb-5">
                <FloatingLabelInputField
                  label="Price"
                  type="text"
                  name="price"
                  value={price}
                  readOnly
                />
              </div>
              <div className="">
                <FloatingLabelInputField
                  label="Room Status"
                  type="text"
                  name="room_status"
                  value={roomStatus}
                  readOnly
                />
              </div>
            </div>
            {/* Description field */}
            <div className="col-span-2 w-full">
              <FloatingLabelTextareaField
                label="Description"
                name="description"
                value={description}
                readOnly
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isDestroying && (
              <div className="col-span-1">
                <Button
                  tag="button"
                  onClick={onClose}
                  className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100"
                >
                  Close
                </Button>
              </div>
            )}

            <div
              className={`${
                isDestroying ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                className="bg-red-600 border-none text-white hover:bg-red-800"
                isLoading={isDestroying}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Deleting Room...</span>
                  </>
                }
              >
                Delete
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
