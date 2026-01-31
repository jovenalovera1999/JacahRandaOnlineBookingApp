import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { BookingColumns } from "@/interfaces/BookingInterface";
import BookingService from "@/services/BookingService";
import { FormEvent, useEffect, useState } from "react";

interface CheckedOutBookingConfirmationModalProps {
  selectedBooking: BookingColumns | null;
  isOpen: boolean;
  onBookingCheckedOut: (
    status: "success" | "failed" | "warning" | "others",
    message: string,
  ) => void;
  onReloadBookings: () => void;
  onClose: () => void;
}

export default function CheckedOutBookingConfirmationModal({
  selectedBooking,
  isOpen,
  onBookingCheckedOut,
  onReloadBookings,
  onClose,
}: CheckedOutBookingConfirmationModalProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [bookingId, setBookingId] = useState<string | number>("");

  // Check out the booking
  const handleCheckOutBooking = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsCheckingOut(true);

      const { status, data } = await BookingService.checkOutBooking(bookingId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during checking booking out at CheckedOutBookingConfirmationModal.tsx: ",
          status,
        );
        return;
      }

      onBookingCheckedOut("success", data.message);
      onReloadBookings();

      onClose();
    } catch (error) {
      console.error(
        "Unexpected server error during checking booking out at CheckedOutBookingConfirmationModal.tsx: ",
        error,
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (isOpen && selectedBooking) {
      setBookingId(selectedBooking.booking_id);
    }
  }, [isOpen, selectedBooking]);

  useEffect(() => {
    if (!isOpen) {
      setBookingId("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal title="Confirmation" isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleCheckOutBooking}>
          <span className="text-gray-800 text-sm font-medium">
            Are you sure do you want to check out this booking?
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {!isCheckingOut && (
              <div className="col-span-1">
                <Button
                  tag="button"
                  onClick={onClose}
                  className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100 focus:ring-0"
                >
                  No
                </Button>
              </div>
            )}

            <div
              className={`${
                isCheckingOut ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                isLoading={isCheckingOut}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Checking the Booking Out...</span>
                  </>
                }
              >
                Yes
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
