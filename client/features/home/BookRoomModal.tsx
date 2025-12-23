import Button from "@/components/ui/Button";
import FloatingLabelDateRangePicker from "@/components/ui/FloatingLabelDateRangePicker";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { BookingFieldsErrors } from "@/interfaces/BookingInterface";
import { RoomColumns } from "@/interfaces/RoomInterface";
import BookingService from "@/services/BookingService";
import { FormEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface BookRoomModalProps {
  selectedRoom: RoomColumns | null;
  isOpen: boolean;
  onBookingAdded: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadAvailableRooms: () => void;
  onClose: () => void;
}

export default function BookRoomModal({
  selectedRoom,
  isOpen,
  onBookingAdded,
  onReloadAvailableRooms,
  onClose,
}: BookRoomModalProps) {
  const [isBooking, setIsBooking] = useState(false);
  const [existingRoomImage, setExistingRoomImage] = useState<string | null>(
    null
  );
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [errors, setErrors] = useState<BookingFieldsErrors>({});

  const handleStoreBooking = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsBooking(true);

      const payload = {
        room_id: selectedRoom?.room_id,
        check_in_date: dateRange?.from?.toISOString().split("T")[0],
        check_out_date: dateRange?.to?.toISOString().split("T")[0],
        additional_information: additionalInformation,
      };

      const { status, data } = await BookingService.storeBooking(payload);

      if (status !== 200) {
        console.error(
          "Unexpected status error during store booking at BookRoomModal.tsx: ",
          status
        );
        return;
      }

      onBookingAdded("success", data.message);
      onReloadAvailableRooms();
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Unexpected server error during store booking at BookRoomModal.tsx: ",
          error
        );
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    if (selectedRoom && isOpen) {
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
      setExistingRoomImage(null);
      setRoomNo("");
      setRoomType("");
      setPrice("");
      setRoomStatus("");
      setDescription("");
      setDateRange(undefined);
    }
  }, [isOpen]);

  return (
    <>
      <Modal title="Book a Room" isOpen={isOpen} onClose={onClose}>
        {/* Image */}
        <Form onSubmit={handleStoreBooking}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4 mb-4">
            <div className="col-span-2 w-full">
              <FloatingLabelDateRangePicker
                label="Stay Duration"
                value={dateRange}
                onChange={setDateRange}
                required
              />
            </div>
            <div className="col-span-2 w-full">
              <FloatingLabelTextareaField
                label="Additional Information"
                name="additional_information"
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
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
                isLoading={isBooking}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Booking Room...</span>
                  </>
                }
              >
                Book
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
