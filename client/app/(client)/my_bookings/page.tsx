"use client";

import CancelBookingConfirmationModal from "@/features/my_bookings/CancelBookingConfirmationModal";
import MyBookingsTable from "@/features/my_bookings/MyBookingsTable";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { BookingColumns } from "@/interfaces/BookingInterface";
import { useState } from "react";

export default function MyBookingsPage() {
  // Hooks
  const { showToastMessage } = useToastMessage();
  const { reload, handleReload } = useReload();

  // States
  const [selectedBooking, setSelectedBooking] = useState<BookingColumns | null>(
    null
  );
  const [isCancelBookingModalOpen, setIsCancelBookingModalOpen] =
    useState(false);

  const handleOpenCancelBookingModal = (
    bookingSelected: BookingColumns | null
  ) => {
    setSelectedBooking(bookingSelected);
    setIsCancelBookingModalOpen(true);
  };

  const handleCloseCancelBookingModal = () => {
    setSelectedBooking(null);
    setIsCancelBookingModalOpen(false);
  };

  return (
    <>
      <CancelBookingConfirmationModal
        selectedBooking={selectedBooking}
        isOpen={isCancelBookingModalOpen}
        onBookingCancelled={(status, message) =>
          showToastMessage(status, message)
        }
        onReloadBookings={handleReload}
        onClose={handleCloseCancelBookingModal}
      />
      <MyBookingsTable
        onCancelBooking={handleOpenCancelBookingModal}
        reloadBookings={reload}
      />
    </>
  );
}
