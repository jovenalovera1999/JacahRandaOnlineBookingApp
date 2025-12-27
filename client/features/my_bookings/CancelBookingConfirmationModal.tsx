import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { BookingColumns } from "@/interfaces/BookingInterface";
import BookingService from "@/services/BookingService";
import { FormEvent, useState } from "react";

interface CancelBookingConfirmationModalProps {
  selectedBooking: BookingColumns | null;
  isOpen: boolean;
  onBookingCancelled: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadBookings: () => void;
  onClose: () => void;
}

export default function CancelBookingConfirmationModal({
  selectedBooking,
  isOpen,
  onBookingCancelled,
  onReloadBookings,
  onClose,
}: CancelBookingConfirmationModalProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  // Cancel booking by soft delete
  const handleCancelBooking = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsCancelling(true);

      const { status, data } = await BookingService.cancelBookingInClientSide(
        selectedBooking?.room.room_id!,
        selectedBooking?.booking_id!
      );

      if (status !== 200) {
        console.error(
          "Unexpected status error during cancel booking at CancelBookingConfirmationModal.tsx: ",
          status
        );
        return;
      }

      onBookingCancelled("success", data.message);
      onReloadBookings();
      onClose();
    } catch (error) {
      console.error(
        "Unexpected server error during cancel booking at CancelBookingConfirmationModal.tsx: ",
        error
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <Modal title="Confirmation" isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleCancelBooking}>
          <span className="text-gray-800 text-sm font-medium">
            Are you sure do you want to cancel your booking?
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {!isCancelling && (
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
                isCancelling ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                isLoading={isCancelling}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Cancelling the Booking...</span>
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
