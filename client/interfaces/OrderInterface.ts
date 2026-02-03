import { BookingColumns } from "./BookingInterface";
import { OrderStatusColumns } from "./OrderStatusInterface";

export interface OrderColumns {
  order_id: number;
  booking: BookingColumns;
  order_status: OrderStatusColumns;
  additional_information: string;
  created_at: string;
  updated_at: string;
}

// interface OrderItemFieldErrors {
//   food_id?: string[];
//   quantity?: string[];
//   price?: string[];
//   subtotal?: string[];
// }

export interface OrderFieldsErrors {
  additional_information?: string[];
  items?: string[];
  //   items_errors?: {
  //     [index: number]: OrderItemFieldErrors;
  //   };
}
