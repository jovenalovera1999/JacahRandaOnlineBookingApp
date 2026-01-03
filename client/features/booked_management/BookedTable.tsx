"use client";

import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
import Button from "@/components/ui/Button";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import {
  useFullDateFormat,
  useFullDateTimeFormat,
} from "@/hooks/useDateTimeFormat";
import { useDebounce } from "@/hooks/useDebounce";
import { BookingColumns } from "@/interfaces/BookingInterface";
import { BookingStatusColumns } from "@/interfaces/BookingStatusInterface";
import { RoomStatusColumns } from "@/interfaces/RoomStatusInterface";
import BookingService from "@/services/BookingService";
import BookingStatusService from "@/services/BookingStatusService";
import { useCallback, useEffect, useState } from "react";

interface BookedTableProps {
  onApproveBooking: (selectedBooking: BookingColumns | null) => void;
  onCancelBooking: (selectedBooking: BookingColumns | null) => void;
  reloadBookings: boolean;
}

export default function BookedTable({
  onApproveBooking,
  onCancelBooking,
  reloadBookings,
}: BookedTableProps) {
  // States
  const [filter, setFilter] = useState("");
  const [bookingStatuses, setBookingStatuses] = useState<
    BookingStatusColumns[]
  >([]);
  const [bookings, setBookings] = useState<BookingColumns[]>([]);
  const [bookingsActionOpenDropdown, setBookingsActionOpenDropdown] = useState<
    string | number | null
  >(null);

  const debouncedFilter = useDebounce(filter);

  const handleLoadBookingStatuses = useCallback(async () => {
    try {
      const { status, data } = await BookingStatusService.loadBookingStatuses();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load booking statuses at BookedTable.tsx: ",
          status
        );
        return;
      }

      setBookingStatuses(data.bookingStatuses);
    } catch (error) {
      console.error(
        "Unexpected server error during load booking statuses at BookedTable.tsx: ",
        error
      );
    }
  }, []);

  // Loads all status bookings in descending order
  const handleLoadBookings = useCallback(async (filterValue: string) => {
    try {
      const { status, data } = await BookingService.loadBookings(filterValue);

      if (status !== 200) {
        console.error(
          "Unexpected status error occured during load pending bookings at BookedTable.tsx: ",
          status
        );
        return;
      }

      setBookings(data.bookings);
    } catch (error) {
      console.error(
        "Unexpected server error occured during load pending bookings at BookedTable.tsx: ",
        error
      );
    }
  }, []);

  // Table headers
  const headers = [
    "Booked Room",
    "Room No.",
    "Check-In Date",
    "Check-Out Date",
    "Customer's Name",
    "Booked Status",
    "Date Booked",
    "Actions",
  ];

  useEffect(() => {
    if (!debouncedFilter) {
      handleLoadBookings("");
    }

    handleLoadBookingStatuses();
    handleLoadBookings(debouncedFilter);
  }, [
    debouncedFilter,
    reloadBookings,
    handleLoadBookingStatuses,
    handleLoadBookings,
  ]);

  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-transparent">
        <div className="relative max-w-full max-h-[calc(100vh-11rem)] overflow-x-auto custom-scrollbar">
          <Table
            filter={
              <>
                <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
                  <div className="md:w-72">
                    <FloatingLabelSelectField
                      label="Filter"
                      name="search"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      autoFocus
                    >
                      <option value="">All Booked Status</option>
                      {bookingStatuses.length > 0 ? (
                        bookingStatuses.map((bookingStatus) => (
                          <option
                            value={bookingStatus.booking_status}
                            key={bookingStatus.booking_status_id}
                          >
                            {bookingStatus.booking_status}
                          </option>
                        ))
                      ) : (
                        <option value="">Loading...</option>
                      )}
                    </FloatingLabelSelectField>
                  </div>
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
                    <TableCell>{booking.user.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.booking_status.booking_status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : booking.booking_status.booking_status ===
                              "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.booking_status.booking_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {useFullDateTimeFormat(booking.created_at)}
                    </TableCell>
                    <TableCell className="relative overflow-visible">
                      {booking.booking_status.booking_status === "Pending" && (
                        <ActionButtonDropdown
                          id={booking.booking_id}
                          openDropdownId={bookingsActionOpenDropdown}
                          setOpenDropdownId={setBookingsActionOpenDropdown}
                        >
                          <Button
                            tag="button"
                            type="button"
                            className="bg-transparent text-gray-800 hover:bg-green-200 hover:text-green-600 text-xs font-medium transition-colors duration-200 w-20"
                            onClick={() => onApproveBooking(booking)}
                          >
                            Approve
                          </Button>
                          <Button
                            tag="button"
                            type="button"
                            className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                            onClick={() => onCancelBooking(booking)}
                          >
                            Cancel
                          </Button>
                        </ActionButtonDropdown>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : bookings.length <= 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="text-center items-center justify-center"
                  >
                    No Bookings Yet
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
        </div>
      </div>
    </>
  );
}
