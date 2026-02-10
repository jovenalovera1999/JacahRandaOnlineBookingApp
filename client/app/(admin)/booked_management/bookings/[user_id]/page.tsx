"use client";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import ApproveBookingConfirmationModal from "@/features/booked_management/ApproveBookingConfirmationModal";
import BookedTable from "@/features/booked_management/BookedTable";
import CancelBookingConfirmationModal from "@/features/booked_management/CancelBookingConfirmationModal";
import CheckedInBookingConfirmationModal from "@/features/booked_management/CheckedInBookingConfirmationModal";
import CheckedOutBookingConfirmationModal from "@/features/booked_management/CheckedOutBookingConfirmationModal";
import CustomerDetails from "@/features/booked_management/CustomerDetails";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { BookingColumns } from "@/interfaces/BookingInterface";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingsPage() {
  const { reload, handleReload } = useReload();
  const { showToastMessage } = useToastMessage();
  const router = useRouter();

  const params = useParams<{ user_id: string }>();
  const userId = params.user_id;

  // States
  const [selectedBooking, setSelectedBooking] = useState<BookingColumns | null>(
    null,
  );

  const [
    isApproveBookingConfirmationModalOpen,
    setIsApproveBookingConfirmationModalOpen,
  ] = useState(false);

  const [
    isCheckInBookingConfirmationModalOpen,
    setIsCheckInBookingConfirmationModalOpen,
  ] = useState(false);

  const [
    isCheckOutBookingConfirmationModalOpen,
    setIsCheckOutBookingConfirmationModalOpen,
  ] = useState(false);

  const [
    isCancelBookingConfirmationModalOpen,
    setIsCancelBookingConfirmationModalOpen,
  ] = useState(false);

  // Approve booking functionality
  const handleOpenApproveBookingConfirmationModal = (
    bookingSelected: BookingColumns | null,
  ) => {
    setSelectedBooking(bookingSelected);
    setIsApproveBookingConfirmationModalOpen(true);
  };

  const handleCloseApproveBookingConfirmationModal = () => {
    setSelectedBooking(null);
    setIsApproveBookingConfirmationModalOpen(false);
  };

  // Check in booking functionality
  const handleOpenCheckInBookingConfirmationModal = (
    bookingSelected: BookingColumns | null,
  ) => {
    setSelectedBooking(bookingSelected);
    setIsCheckInBookingConfirmationModalOpen(true);
  };

  const handleCloseCheckInBookingConfirmationModal = () => {
    setSelectedBooking(null);
    setIsCheckInBookingConfirmationModalOpen(false);
  };

  // Check out booking functionality
  const handleOpenCheckOutBookingConfirmationModal = (
    bookingSelected: BookingColumns | null,
  ) => {
    setSelectedBooking(bookingSelected);
    setIsCheckOutBookingConfirmationModalOpen(true);
  };

  const handleCloseCheckOutBookingConfirmationModal = () => {
    setSelectedBooking(null);
    setIsCheckOutBookingConfirmationModalOpen(false);
  };

  // Cancel booking functionality
  const handleOpenCancelBookingConfirmationModal = (
    bookingSelected: BookingColumns | null,
  ) => {
    setSelectedBooking(bookingSelected);
    setIsCancelBookingConfirmationModalOpen(true);
  };

  const handleCloseCancelBookingConfirmationModal = () => {
    setSelectedBooking(null);
    setIsCancelBookingConfirmationModalOpen(false);
  };

  if (!userId) {
    return (
      <>
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">Bookings</h1>

      <ApproveBookingConfirmationModal
        selectedBooking={selectedBooking}
        isOpen={isApproveBookingConfirmationModalOpen}
        onBookingApproved={(status, message) =>
          showToastMessage(status, message)
        }
        onReloadBookings={handleReload}
        onClose={handleCloseApproveBookingConfirmationModal}
      />

      <CheckedInBookingConfirmationModal
        selectedBooking={selectedBooking}
        isOpen={isCheckInBookingConfirmationModalOpen}
        onBookingCheckedIn={(status, message) =>
          showToastMessage(status, message)
        }
        onReloadBookings={handleReload}
        onClose={handleCloseCheckInBookingConfirmationModal}
      />

      <CheckedOutBookingConfirmationModal
        selectedBooking={selectedBooking}
        isOpen={isCheckOutBookingConfirmationModalOpen}
        onBookingCheckedOut={(status, message) =>
          showToastMessage(status, message)
        }
        onReloadBookings={handleReload}
        onClose={handleCloseCheckOutBookingConfirmationModal}
      />

      <CancelBookingConfirmationModal
        selectedBooking={selectedBooking}
        isOpen={isCancelBookingConfirmationModalOpen}
        onBookingCancelled={(status, message) =>
          showToastMessage(status, message)
        }
        onReloadBookings={handleReload}
        onClose={handleCloseCancelBookingConfirmationModal}
      />

      <Button
        tag="button"
        type="button"
        className="bg-white text-gray-600 hover:bg-gray-100 w-32 mb-5"
        onClick={() => router.back()}
      >
        Back
      </Button>

      <CustomerDetails userId={userId} />

      <BookedTable
        userId={userId}
        onApproveBooking={handleOpenApproveBookingConfirmationModal}
        onCheckInBooking={handleOpenCheckInBookingConfirmationModal}
        onCheckOutBooking={handleOpenCheckOutBookingConfirmationModal}
        onCancelBooking={handleOpenCancelBookingConfirmationModal}
        reloadBookings={reload}
      />
    </>
  );
}
