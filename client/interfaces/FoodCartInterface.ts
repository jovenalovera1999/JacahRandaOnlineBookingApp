import { FoodColumns } from "./FoodInterface";
import { OrderColumns } from "./OrderInterface";

export interface FoodCartColumns {
  food_cart_id: Number;
  order: OrderColumns;
  food: FoodColumns;
  quantity: Number;
  price: Number;
  Subtotal: Number;
  created_at: string;
  updated_at: string;
}
