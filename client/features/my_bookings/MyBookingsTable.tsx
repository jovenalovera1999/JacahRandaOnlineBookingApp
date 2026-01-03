"use client";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { useFullDateFormat } from "@/hooks/useDateTimeFormat";
import { BookingColumns } from "@/interfaces/BookingInterface";
import BookingService from "@/services/BookingService";
import { useCallback, useEffect, useState } from "react";

interface MyBookingsTableProps {
  onCancelBooking: (selectedBooking: BookingColumns | null) => void;
  reloadBookings: boolean;
}

export default function MyBookingsTable({
  onCancelBooking,
  reloadBookings,
}: MyBookingsTableProps) {
  const [bookings, setBookings] = useState<BookingColumns[]>([]);

  const headers = [
    "Booked Room",
    "Room No.",
    "Check-In Date",
    "Check-Out Date",
    "Status",
    "Action",
  ];

  const handleLoadPendingBookings = useCallback(async () => {
    try {
      const { status, data } =
        await BookingService.loadBookingsOfCurrentLoggedInUserClient();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load pending bookings at MyBookingsTable,tsx: ",
          status
        );
        return;
      }

      setBookings(data.bookings);
    } catch (error) {
      console.error(
        "Unexpected server error during load pending bookings at MyBookingsTable.tsx: ",
        error
      );
    }
  }, []);

  useEffect(() => {
    handleLoadPendingBookings();
  }, [reloadBookings, handleLoadPendingBookings]);

  return (
    <>
      <Table
        filter={
          <>
            <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
              <div className="md:w-32">
                <Button tag="a" href="/">
                  Add Booking
                </Button>
              </div>
              {/* <div className="md:w-72">
                <FloatingLabelInputField
                  label="Search"
                  type="text"
                  name="search"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div> */}
            </div>
          </>
        }
      >
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell className="text-blue-600" isHeader key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow
                key={booking.booking_id}
                className="text-gray-800 hover:bg-gray-100 transition-colors duration-200"
              >
                <TableCell>{booking.room.room_type.room_type}</TableCell>
                <TableCell>{booking.room.room_no}</TableCell>
                <TableCell>
                  {useFullDateFormat(booking.check_in_date)}
                </TableCell>
                <TableCell>
                  {useFullDateFormat(booking.check_out_date)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.booking_status.booking_status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : booking.booking_status.booking_status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.booking_status.booking_status}
                  </span>
                </TableCell>
                <TableCell>
                  {booking.booking_status.booking_status === "Pending" && (
                    <Button
                      tag="button"
                      type="button"
                      className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                      onClick={() => onCancelBooking(booking)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : bookings.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center text-gray-800 items-center justify-center"
              >
                You haven't booked yet
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center items-center justify-center"
              >
                <Spinner size="md" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
