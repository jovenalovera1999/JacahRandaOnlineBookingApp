import Button from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { useGoogleAuth } from "@/context/GoogleAuthContext";
import { useFullDateTimeFormat } from "@/hooks/useDateTimeFormat";
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
  const { user } = useGoogleAuth();

  // States
  const [notifications, setNotifications] = useState<NotificationColumns[]>([]);

  const handleLoadnotifications = useCallback(async () => {
    try {
      const { status, data } = await NotificationService.loadNotifications();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load cancelled bookings at NotificationsTable.tsx: ",
          status,
        );
        return;
      }

      setNotifications(data.notifications);
    } catch (error) {
      console.error(
        "Unexpected server error during load cancelled bookings at NotificationsTable.tsx: ",
        error,
      );
    }
  }, []);

  const handleMarkNotificationAsRead = async (
    notificationId: string | number,
  ) => {
    try {
      const { status } =
        await NotificationService.updateNotificationToSeen(notificationId);

      if (status !== 200) {
        console.error(
          "Unexpected error status during marking notification as read at NotificationsTable.tsx: ",
          status,
        );
        return;
      }

      onReloadNotifications();
    } catch (error) {
      console.error(
        "Unexpected server error during marking notification as read at NotificationsTable.tsx: ",
        error,
      );
    }
  };

  const headers = ["Details", "Description", "Action", "Date Notified"];

  const TypeBadge = ({ type }: { type: "booking" | "order" }) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold
      ${
        type === "booking"
          ? "bg-blue-100 text-blue-700"
          : "bg-purple-100 text-purple-700"
      }`}
    >
      {type === "booking" ? "Booking" : "Order"}
    </span>
  );

  useEffect(() => {
    if (!user) return;
    handleLoadnotifications();
  }, [user, reloadNotifications, handleLoadnotifications]);

  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-transparent mt-20">
        <div className="relative max-w-full max-h-[calc(100vh-10rem)] overflow-x-auto custom-scrollbar">
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
                notifications.map((notification) => {
                  const isBooking = !!notification.booking;
                  const isOrder = !!notification.order;

                  return (
                    <TableRow
                      key={notification.notification_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* DETAILS */}
                      <TableCell className="align-top">
                        <div className="rounded-xl border bg-white p-4 shadow-sm space-y-4">
                          <div className="flex items-center justify-between">
                            <TypeBadge type={isBooking ? "booking" : "order"} />
                            {!notification.is_seen && (
                              <span className="text-xs text-red-500 font-semibold">
                                New
                              </span>
                            )}
                          </div>

                          {/* ROOM */}
                          <section>
                            <h4 className="text-xs font-semibold text-gray-600 mb-2">
                              Room Details
                            </h4>
                            <dl className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <dt className="text-gray-500">Room</dt>
                                <dd className="font-medium">
                                  {isBooking
                                    ? notification.booking.room.room_no
                                    : notification.order.booking.room.room_no}
                                </dd>
                              </div>

                              <div className="flex justify-between">
                                <dt className="text-gray-500">Type</dt>
                                <dd>
                                  {isBooking
                                    ? notification.booking.room.room_type
                                        .room_type
                                    : notification.order.booking.room.room_type
                                        .room_type}
                                </dd>
                              </div>
                            </dl>
                          </section>

                          {/* STATUS */}
                          <section className="pt-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Status
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100">
                                {isBooking
                                  ? notification.booking.booking_status
                                      .booking_status
                                  : notification.order.order_status
                                      .order_status}
                              </span>
                            </div>
                          </section>
                        </div>
                      </TableCell>

                      {/* DESCRIPTION */}
                      <TableCell className="align-middle text-sm text-gray-700 max-w-md">
                        <p className="line-clamp-3">
                          {notification.description}
                        </p>
                      </TableCell>

                      {/* ACTION */}
                      <TableCell className="align-middle">
                        {!notification.is_seen && (
                          <Button
                            tag="button"
                            type="button"
                            className="bg-white border hover:bg-gray-100 text-gray-800"
                            onClick={() =>
                              handleMarkNotificationAsRead(
                                notification.notification_id,
                              )
                            }
                          >
                            Mark as Read
                          </Button>
                        )}
                      </TableCell>

                      {/* DATE */}
                      <TableCell className="text-xs text-gray-500">
                        {useFullDateTimeFormat(notification.created_at)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="text-center py-10"
                  >
                    No Notifications
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
