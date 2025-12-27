import { BookingStatusColumns } from "./BookingStatusInterface";
import { RoomColumns } from "./RoomInterface";
import { UserColumns } from "./UserInterface";

export interface BookingColumns {
  booking_id: number;
  user: UserColumns;
  room: RoomColumns;
  check_in_date: string;
  check_out_date: string;
  additional_information?: string;
  booking_status: BookingStatusColumns;
}

export interface BookingFieldsErrors {
  check_in_date?: string[];
  check_out_date?: string[];
  additional_information?: string[];
}

export interface CancelBookingFieldsErrors {
  reason?: string[];
}
