import { BookingColumns } from "./BookingInterface";

export interface NotificationColumns {
  notification_id: number;
  booking: BookingColumns;
  description: string;
  is_seen?: string;
  created_at: string;
  updated_at: string;
}
