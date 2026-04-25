"use client";

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
import { format } from "date-fns";
import { FormEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import RoomAvailabilityCalendar from "./RoomAvailabilityCalendar";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";

interface BookRoomModalProps {
  selectedRoom: RoomColumns | null;
  isOpen: boolean;
  onBookingAdded: (
    status: "success" | "failed" | "warning" | "others",
    message: string,
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
  const [bookedRanges, setBookedRanges] = useState<DateRange[]>([]);
  const [existingRoomImage, setExistingRoomImage] = useState<string | null>(
    null,
  );
  const [roomId, setRoomId] = useState(0);
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [discount, setDiscount] = useState("");
  const [addDownpaymentImage, setAddDownpaymentImage] = useState<File | null>(
    null,
  );
  const [errors, setErrors] = useState<BookingFieldsErrors>({});

  const handleRemoveDownpaymentImage = () => {
    setAddDownpaymentImage(null);
  };

  const handleStoreBooking = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsBooking(true);

      const formData = new FormData();
      formData.append("downpayment_image", addDownpaymentImage ?? "");
      formData.append("room_id", roomId.toString());
      formData.append(
        "check_in_date",
        dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
      );
      formData.append(
        "check_out_date",
        dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
      );
      formData.append("discount", discount);
      formData.append("additional_information", additionalInformation);

      const { status, data } = await BookingService.storeBooking(formData);

      if (status !== 200) {
        console.error(
          "Unexpected status error during store booking at BookRoomModal.tsx: ",
          status,
        );
        return;
      }

      onBookingAdded("success", data.message);
      onReloadAvailableRooms();

      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        onBookingAdded("failed", error.response.data.message);
        return;
      } else if (error.response && error.response.status !== 422) {
        console.error(
          "Unexpected server error during store booking at BookRoomModal.tsx: ",
          error,
        );
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsBooking(false);
    }
  };

  const loadBookedDates = async () => {
    if (!roomId) return;

    try {
      const { status, data } = await BookingService.loadBookedDates(roomId);

      if (status !== 200) return;

      const ranges: DateRange[] = data.bookedDates.map((item: any) => ({
        from: new Date(item.check_in_date),
        to: new Date(item.check_out_date),
      }));

      setBookedRanges(ranges);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) loadBookedDates();
  }, [roomId, isOpen]);

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
      setDateRange(undefined);
      setAdditionalInformation("");
      setAddDownpaymentImage(null);
    }
  }, [isOpen]);

  const numericPrice = Number(price || 0);
  const numericDiscount = Number(discount || 0);

  const discountedPrice =
    numericDiscount > 0
      ? numericPrice - (numericPrice * numericDiscount) / 100
      : numericPrice;

  const savings = numericPrice - discountedPrice;

  return (
    <>
      <Modal title="Book a Room" isOpen={isOpen} onClose={onClose}>
        {/* Image */}
        <Form onSubmit={handleStoreBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-1">
              <UploadField
                label="Room Image"
                labelFile="PNG, JPG or JPEG"
                name="room_image"
                alt="Room Image"
                existingFileUrl={existingRoomImage}
                readOnly
              />
            </div>
            <div className="col-span-1">
              <RoomAvailabilityCalendar bookedRanges={bookedRanges} />
            </div>
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
                roomId={roomId}
                bookedRanges={bookedRanges}
                value={dateRange}
                onChange={setDateRange}
                required
                errors={errors.check_in_date || errors.check_out_date}
              />
            </div>

            <div className="col-span-2  w-full">
              <FloatingLabelTextareaField
                label="Additional Information"
                name="additional_information"
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
                errors={errors.additional_information}
              />
            </div>

            <div className="col-span-2 w-full">
              <div className="mb-2">
                <FloatingLabelSelectField
                  label="Discount"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  errors={errors.discount}
                >
                  <option value={0}>None</option>
                  <option value={10}>VIP</option>
                  <option value={20}>PWD / Senior Citizen</option>
                </FloatingLabelSelectField>
              </div>
              {numericDiscount > 0 && (
                <div className="col-span-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      Discounted Price
                    </p>

                    <div className="flex items-center gap-3">
                      {/* Original Price */}
                      <span className="text-gray-400 line-through text-lg">
                        ₱{numericPrice.toLocaleString()}
                      </span>

                      {/* Discounted Price */}
                      <span className="text-2xl font-bold text-green-600">
                        ₱{discountedPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Savings */}
                    <p className="text-xs text-green-700 mt-1">
                      You saved ₱{savings.toLocaleString()} ({numericDiscount}%)
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-2 w-full">
              <UploadField
                label="Downpayment Image"
                labelFile="PNG, JPG or JPEG"
                name="downpayment_image"
                alt="Downpayment Image"
                value={addDownpaymentImage}
                onChange={setAddDownpaymentImage}
                onRemoveFile={handleRemoveDownpaymentImage}
                errors={errors.downpayment_image}
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
