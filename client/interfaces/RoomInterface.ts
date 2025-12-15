import { RoomStatusColumns } from "./RoomStatusInterface";
import { RoomTypeColumns } from "./RoomTypeInterface";

export interface RoomColumns {
  room_id: number;
  room_image: string | null;
  room_no: string;
  room_type: RoomTypeColumns;
  description: string | null;
  price: string;
  room_status: RoomStatusColumns;
  created_at: string;
  updated_at: string;
}

export interface RoomFieldsErrors {
  room_image?: string[];
  room_no?: string[];
  room_type?: string[];
  description?: string[];
  price?: string[];
  room_status?: string[];
}
