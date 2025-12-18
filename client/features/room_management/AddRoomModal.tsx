"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { RoomFieldsErrors } from "@/interfaces/RoomInterface";
import { RoomStatusColumns } from "@/interfaces/RoomStatusInterface";
import { RoomTypeColumns } from "@/interfaces/RoomTypeInterface";
import api from "@/lib/axios";
import RoomService from "@/services/RoomService";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface AddRoomModalProps {
  isOpen: boolean;
  reloadRoomReferences: boolean;
  onRoomAdded: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadRooms: () => void;
  onClose: () => void;
}

export default function AddRoomModal({
  isOpen,
  reloadRoomReferences,
  onRoomAdded,
  onReloadRooms,
  onClose,
}: AddRoomModalProps) {
  //States
  const [roomTypes, setRoomTypes] = useState<RoomTypeColumns[]>([]);
  const [roomStatuses, setRoomStatuses] = useState<RoomStatusColumns[]>([]);

  const [isStoring, setIsStoring] = useState(false);
  const [addRoomImage, setAddRoomImage] = useState<File | null>(null);
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<RoomFieldsErrors>({});

  // Load room references from tbl_room_types and tbl_room_statuses at RoomController.php
  const handleLoadRoomReferences = useCallback(async () => {
    try {
      const { status, data } = await RoomService.loadRoomReferences();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load room references at AddRoomModal.tsx: ",
          status
        );
        return;
      }

      setRoomTypes(data.roomTypes);
      setRoomStatuses(data.roomStatuses);
    } catch (error) {
      console.error(
        "Unexpected server error during load room references at AddRoomModal.tsx: ",
        error
      );
    }
  }, []);

  // Store room from RoomController.php
  const handleStoreRoom = async (e: FormEvent) => {
    e.preventDefault();
    setIsStoring(true);

    try {
      const formData = new FormData();
      formData.append("room_image", addRoomImage ?? "");
      formData.append("room_no", roomNo);
      formData.append("room_type", roomType);
      formData.append("price", price);
      formData.append("room_status", roomStatus);
      formData.append("description", description);

      const { status, data } = await api.post("/room/storeRoom", formData);

      if (status !== 200) {
        console.error("Unexpected status error during add room: ", status);
        return;
      }

      setAddRoomImage(null);
      setRoomNo("");
      setRoomType("");
      setPrice("");
      setRoomStatus("");
      setDescription("");

      onRoomAdded("success", data.message);
      onReloadRooms();
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error("Unexpected server error during add room: ", error);
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsStoring(false);
    }
  };

  useEffect(() => {
    if (isOpen) handleLoadRoomReferences();
  }, [isOpen, reloadRoomReferences]);

  return (
    <>
      <Modal title="Add Room" isOpen={isOpen} onClose={onClose}>
        {roomTypes.length > 0 && roomStatuses.length > 0 ? (
          <>
            {/* Upload field */}
            <Form onSubmit={handleStoreRoom}>
              <div className="mb-5 w-full">
                <UploadField
                  label="Room Image"
                  labelFile="PNG, JPG or JPEG"
                  name="room_image"
                  alt="Room Image"
                  value={addRoomImage}
                  onChange={setAddRoomImage}
                  errors={errors.room_image}
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
                      onChange={(e) => setRoomNo(e.target.value)}
                      errors={errors.room_no}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="">
                    <FloatingLabelSelectField
                      label="Room Type"
                      name="room_type"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      errors={errors.room_type}
                      required
                    >
                      <option value="">Select Room Type</option>
                      {roomTypes.map((roomType) => (
                        <option
                          value={roomType.room_type_id}
                          key={roomType.room_type_id}
                        >
                          {roomType.room_type}
                        </option>
                      ))}
                    </FloatingLabelSelectField>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 w-full">
                  <div className="mb-5">
                    <FloatingLabelInputField
                      label="Price"
                      type="text"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      errors={errors.price}
                      required
                    />
                  </div>
                  <div className="">
                    <FloatingLabelSelectField
                      label="Room Status"
                      name="room_status"
                      value={roomStatus}
                      onChange={(e) => setRoomStatus(e.target.value)}
                      errors={errors.room_status}
                      required
                    >
                      <option value="">Select Room Status</option>
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
                {/* Description field */}
                <div className="col-span-2 w-full">
                  <FloatingLabelTextareaField
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    errors={errors.description}
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!isStoring && (
                  <div className="col-span-1">
                    <Button
                      tag="button"
                      onClick={onClose}
                      className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100 focus:ring-0"
                    >
                      Close
                    </Button>
                  </div>
                )}

                <div
                  className={`${
                    isStoring ? "col-span-1 md:col-span-2" : "col-span-1"
                  }`}
                >
                  <Button tag="button" type="submit" isLoading={isStoring}>
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
