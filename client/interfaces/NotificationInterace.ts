import { BookingColumns } from "./BookingInterface";

export interface NotificationColumns {
  notification_id: number;
  booking: BookingColumns;
  reason: string;
  is_seen?: string;
}
