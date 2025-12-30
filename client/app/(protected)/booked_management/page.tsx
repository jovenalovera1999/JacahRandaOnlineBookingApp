"use client";

import ApproveBookingConfirmationModal from "@/features/booked_management/ApproveBookingConfirmationModal";
import BookedTable from "@/features/booked_management/BookedTable";
import CancelBookingConfirmationModal from "@/features/booked_management/CancelBookingConfirmationModal";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { BookingColumns } from "@/interfaces/BookingInterface";
import { useState } from "react";

export default function BookedManagementPage() {
  // Hooks
  const { showToastMessage } = useToastMessage();
  const { reload, handleReload } = useReload();

  // States
  const [selectedBooking, setSelectedBooking] = useState<BookingColumns | null>(
    null
  );
  const [
    isApproveBookingConfirmationModalOpen,
    setIsApproveBookingConfirmationModalOpen,
  ] = useState(false);
  const [
    isCancelBookingConfirmationModalOpen,
    setIsCancelBookingConfirmationModalOpen,
  ] = useState(false);

  // Approve booking
  const handleOpenApproveBookingConfirmationModal = (
    bookingSelected: BookingColumns | null
  ) => {
    setSelectedBooking(bookingSelected);
    setIsApproveBookingConfirmationModalOpen(true);
  };

  const handleCloseApproveBookingConfirmationModal = () => {
    setSelectedBooking(null);
    setIsApproveBookingConfirmationModalOpen(false);
  };

  // Cancel booking
  const handleOpenCancelBookingConfirmationModal = (
    bookingSelected: BookingColumns | null
  ) => {
    setSelectedBooking(bookingSelected);
    setIsCancelBookingConfirmationModalOpen(true);
  };

  const handleCloseCancelBookingConfirmationModal = () => {
    setSelectedBooking(null);
    setIsCancelBookingConfirmationModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Booked Management
      </h1>

      <ApproveBookingConfirmationModal
        selectedBooking={selectedBooking}
        isOpen={isApproveBookingConfirmationModalOpen}
        onBookingApproved={(status, message) =>
          showToastMessage(status, message)
        }
        onReloadBookings={handleReload}
        onClose={handleCloseApproveBookingConfirmationModal}
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

      <BookedTable
        onApproveBooking={handleOpenApproveBookingConfirmationModal}
        onCancelBooking={handleOpenCancelBookingConfirmationModal}
        reloadBookings={reload}
      />
    </>
  );
}
