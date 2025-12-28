import { BookingStatusColumns } from "./BookingStatusInterface";

export interface NotificationColumns {
  notification_id: number;
  booking_id: BookingStatusColumns;
  reason: string;
  is_seen?: string;
}
