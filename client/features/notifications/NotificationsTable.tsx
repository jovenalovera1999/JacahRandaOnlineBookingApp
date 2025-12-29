import Button from "@/components/ui/Button";
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
import NotificationService from "@/services/NotificationService";
import { useCallback, useEffect, useState } from "react";

interface NotificationsTableProps {
  onReloadNotifications: () => void;
  reloadNotifications: boolean;
}

export default function NotificationsTable({
  onReloadNotifications,
  reloadNotifications,
}: NotificationsTableProps) {
  // States
  const [notifications, setNotifications] = useState<NotificationColumns[]>([]);

  const handleLoadnotifications = useCallback(async () => {
    try {
      const { status, data } = await NotificationService.loadNotifications();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load cancelled bookings at NotificationsTable.tsx: ",
          status
        );
        return;
      }

      setNotifications(data.notifications);
    } catch (error) {
      console.error(
        "Unexpected server error during load cancelled bookings at NotificationsTable.tsx: ",
        error
      );
    }
  }, []);

  const handleMarkNotificationAsRead = async (
    notificationId: string | number
  ) => {
    try {
      const { status } = await NotificationService.updateNotificationToSeen(
        notificationId
      );

      if (status !== 200) {
        console.error(
          "Unexpected error status during marking notification as read at NotificationsTable.tsx: ",
          status
        );
        return;
      }

      onReloadNotifications();
    } catch (error) {
      console.error(
        "Unexpected server error during marking notification as read at NotificationsTable.tsx: ",
        error
      );
    }
  };

  const headers = ["Details", "Description", "Action", "Date Notified"];

  useEffect(() => {
    handleLoadnotifications();
  }, [reloadNotifications, handleLoadnotifications]);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                isHeader
                className={`text-blue-600 ${
                  header === "Description" ? "w-xl" : ""
                }`}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <TableRow
                key={notification.notification_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="align-middle">
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
                    {/* ROOM */}
                    <section>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Room Details
                      </h4>

                      <dl className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Room No</dt>
                          <dd className="font-medium">
                            {notification.booking.room.room_no}
                          </dd>
                        </div>

                        <div className="flex justify-between">
                          <dt className="text-gray-500">Type</dt>
                          <dd className="font-medium">
                            {notification.booking.room.room_type.room_type}
                          </dd>
                        </div>

                        {notification.booking.room.description && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Description</dt>
                            <dd className="font-medium truncate max-w-[220px]">
                              {notification.booking.room.description}
                            </dd>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <dt className="text-gray-500">Price</dt>
                          <dd className="font-semibold text-gray-800">
                            ₱
                            {Number(
                              notification.booking.room.price
                            ).toLocaleString()}
                          </dd>
                        </div>
                      </dl>
                    </section>

                    <hr className="border-gray-200" />

                    {/* BOOKING */}
                    <section>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Booking
                      </h4>

                      <dl className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Check-in</dt>
                          <dd>
                            {useFullDateFormat(
                              notification.booking.check_in_date
                            )}
                          </dd>
                        </div>

                        <div className="flex justify-between">
                          <dt className="text-gray-500">Check-out</dt>
                          <dd>
                            {useFullDateFormat(
                              notification.booking.check_out_date
                            )}
                          </dd>
                        </div>

                        {notification.booking.additional_information && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">
                              Additional Information
                            </dt>
                            <dd className="truncate max-w-[220px]">
                              {notification.booking.additional_information}
                            </dd>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-1">
                          <dt className="text-gray-500">Status</dt>
                          <dd>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            notification.booking.booking_status
                              .booking_status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : notification.booking.booking_status
                                  .booking_status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                            >
                              {
                                notification.booking.booking_status
                                  .booking_status
                              }
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </section>
                  </div>
                </TableCell>

                {/* DESCRIPTION / NOTIFICATION */}
                <TableCell className="align-middle text-sm text-gray-800">
                  {notification.description}
                </TableCell>

                <TableCell>
                  {!notification.is_seen && (
                    <Button
                      tag="button"
                      type="button"
                      className="bg-white hover:bg-gray-100 text-gray-800"
                      onClick={() =>
                        handleMarkNotificationAsRead(
                          notification.notification_id
                        )
                      }
                    >
                      Mark as Read
                    </Button>
                  )}
                </TableCell>

                <TableCell>
                  {useFullDateFormat(notification.created_at)}
                </TableCell>
              </TableRow>
            ))
          ) : notifications.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                No Notifications
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center py-10 text-gray-500"
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
