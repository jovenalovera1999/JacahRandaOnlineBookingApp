import { BookingColumns } from "./BookingInterface";
import { OrderColumns } from "./OrderInterface";

export interface NotificationColumns {
  notification_id: number;
  booking: BookingColumns;
  order: OrderColumns;
  description: string;
  is_seen?: string;
  created_at: string;
  updated_at: string;
}
