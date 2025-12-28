import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import useFullDateFormat from "@/hooks/useFullDateFormat";
import { NotificationColumns } from "@/interfaces/NotificationInterace";
import BookingService from "@/services/BookingService";
import { useCallback, useEffect, useState } from "react";

export default function NotificationsTable() {
  // States
  const [cancelledBookings, setCancelledBookings] = useState<
    NotificationColumns[]
  >([]);

  const handleLoadCancelledBookings = useCallback(async () => {
    try {
      const { status, data } = await BookingService.loadCancelledBookings();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load cancelled bookings at NotificationsTable.tsx: ",
          status
        );
        return;
      }

      setCancelledBookings(data.cancelledBookings);
    } catch (error) {
      console.error(
        "Unexpected server error during load cancelled bookings at NotificationsTable.tsx: ",
        error
      );
    }
  }, []);

  const headers = ["Room Details", "Booking Details", "Reason"];

  useEffect(() => {
    handleLoadCancelledBookings();
  }, [handleLoadCancelledBookings]);

  return (
    <>
      <Table>
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
          {cancelledBookings.length > 0 ? (
            cancelledBookings.map((booking) => (
              <TableRow
                key={booking.notification_id}
                className="text-gray-800 hover:bg-gray-100 transition-colors duration-200"
              >
                <TableCell className="align-top">
                  <div className="space-y-4">
                    {/* ROOM DETAILS */}
                    <div>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium text-gray-600">
                            Room No:
                          </span>{" "}
                          {booking.booking.room.room_no}
                        </p>

                        <p>
                          <span className="font-medium text-gray-600">
                            Room Type:
                          </span>{" "}
                          {booking.booking.room.room_type.room_type}
                        </p>

                        {booking.booking.room.description && (
                          <p>
                            <span className="font-medium text-gray-600">
                              Description:
                            </span>{" "}
                            {booking.booking.room.description}
                          </p>
                        )}

                        <p>
                          <span className="font-medium text-gray-600">
                            Price:
                          </span>{" "}
                          ₱{Number(booking.booking.room.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {/* BOOKING DETAILS */}
                  <div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium text-gray-600">
                          Check-in:
                        </span>{" "}
                        {useFullDateFormat(booking.booking.check_in_date)}
                      </p>

                      <p>
                        <span className="font-medium text-gray-600">
                          Check-out:
                        </span>{" "}
                        {useFullDateFormat(booking.booking.check_out_date)}
                      </p>

                      {booking.booking.additional_information && (
                        <p>
                          <span className="font-medium text-gray-600">
                            Additional Info:
                          </span>{" "}
                          {booking.booking.additional_information}
                        </p>
                      )}

                      <p>
                        <span className="font-medium text-gray-600">
                          Status:
                        </span>{" "}
                        <span
                          className={` px-2 py-1 rounded-full text-xs font-semibold ${
                            booking.booking.booking_status.booking_status ===
                            "Approved"
                              ? "bg-green-100 text-green-700"
                              : booking.booking.booking_status
                                  .booking_status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.booking.booking_status.booking_status}
                        </span>
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{booking.reason}</TableCell>
              </TableRow>
            ))
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
