import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { NotificationColumns } from "@/interfaces/NotificationInterace";
import BookingService from "@/services/BookingService";
import { useCallback, useEffect, useState } from "react";

export default function NotificationsTable() {
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

  const headers = [
    "Room Details",
    "Booking Details",
    "Booking Status",
    "Reason",
  ];

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
                <TableCell></TableCell>
                {/* <TableCell className="relative overflow-visible">
                  <ActionButtonDropdown
                    id={room.room_id}
                    openDropdownId={roomsActionOpenDropdown}
                    setOpenDropdownId={setRoomsActionOpenDropdown}
                  >
                    <Button
                      tag="button"
                      type="button"
                      className="bg-transparent text-gray-800 hover:bg-green-200 hover:text-green-600 text-xs font-medium transition-colors duration-200 w-20"
                      onClick={() => onEditRoom(room)}
                    >
                      Edit
                    </Button>
                    <Button
                      tag="button"
                      type="button"
                      className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                      onClick={() => onDeleteRoom(room)}
                    >
                      Delete
                    </Button>
                  </ActionButtonDropdown>
                </TableCell> */}
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
