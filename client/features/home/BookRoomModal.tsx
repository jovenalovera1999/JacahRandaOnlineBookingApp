import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useEffect, useState } from "react";

interface BookRoomModalProps {
  selectedRoom: RoomColumns | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookRoomModal({
  selectedRoom,
  isOpen,
  onClose,
}: BookRoomModalProps) {
  const [isBooking, setIsBooking] = useState(false);

  return (
    <>
      <Modal title="Book a Room" isOpen={isOpen} onClose={onClose}>
        {/* Image */}
        <Form>
          <div className="mb-5 w-full">
            <UploadField
              label="Room Image"
              labelFile="PNG, JPG or JPEG"
              name="room_image"
              alt="Room Image"
              existingFileUrl={selectedRoom?.room_image ?? null}
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
                  value={selectedRoom?.room_no}
                  readOnly
                />
              </div>
              <div className="">
                <FloatingLabelInputField
                  label="Room Type"
                  type="text"
                  name="room_type"
                  value={selectedRoom?.room_type.room_type}
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
                  value={selectedRoom?.price}
                  readOnly
                />
              </div>
              <div className="">
                <FloatingLabelInputField
                  label="Room Status"
                  type="text"
                  name="room_status"
                  value={selectedRoom?.room_status.room_status}
                  readOnly
                />
              </div>
            </div>
            {/* Description field */}
            <div className="col-span-2 w-full">
              <FloatingLabelTextareaField
                label="Description"
                name="description"
                value={selectedRoom?.description ?? ""}
                readOnly
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isBooking && (
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
                isBooking ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                className="bg-red-600 border-none text-white hover:bg-red-800"
                isLoading={isBooking}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Booking Room...</span>
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
