import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { BookingColumns } from "@/interfaces/BookingInterface";
import BookingService from "@/services/BookingService";
import { FormEvent, useState } from "react";

interface ApproveBookingConfirmationModalProps {
  selectedBooking: BookingColumns | null;
  isOpen: boolean;
  onBookingApproved: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadBookings: () => void;
  onClose: () => void;
}

export default function ApproveBookingConfirmationModal({
  selectedBooking,
  isOpen,
  onBookingApproved,
  onReloadBookings,
  onClose,
}: ApproveBookingConfirmationModalProps) {
  const [isApproving, setIsApproving] = useState(false);

  // Cancel booking by soft delete
  const handleApproveBooking = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsApproving(true);

      const { status, data } = await BookingService.approveBooking(
        selectedBooking?.booking_id!
      );

      if (status !== 200) {
        console.error(
          "Unexpected status error during approve booking at ApproveBookingConfirmationModal.tsx: ",
          status
        );
        return;
      }

      onBookingApproved("success", data.message);
      onReloadBookings();
      onClose();
    } catch (error) {
      console.error(
        "Unexpected server error during approve booking at ApproveBookingConfirmationModal.tsx: ",
        error
      );
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <>
      <Modal title="Confirmation" isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleApproveBooking}>
          <span className="text-gray-800 text-sm font-medium">
            Are you sure do you want to approve this booking?
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {!isApproving && (
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
                isApproving ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                isLoading={isApproving}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Approving the Booking...</span>
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
