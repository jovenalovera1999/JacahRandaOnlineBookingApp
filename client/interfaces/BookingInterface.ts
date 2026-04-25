import { BookingStatusColumns } from "./BookingStatusInterface";
import { RoomColumns } from "./RoomInterface";
import { UserColumns } from "./UserInterface";

export interface BookingColumns {
  booking_id: number;
  downpayment_image: string;
  user: UserColumns;
  room: RoomColumns;
  check_in_date: string;
  check_out_date: string;
  additional_information?: string;
  booking_status: BookingStatusColumns;
  created_at: string;
  updated_at: string;
}

export interface BookingFieldsErrors {
  downpayment_image?: string[];
  discount?: string[];
  check_in_date?: string[];
  check_out_date?: string[];
  additional_information?: string[];
}

export interface CancelBookingFieldsErrors {
  reason?: string[];
}
