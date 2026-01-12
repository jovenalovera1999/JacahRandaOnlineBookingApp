import { FoodCategoryColumns } from "./FoodCategory";
import { FoodStatusColumns } from "./FoodStatusInterface";

export interface FoodColumns {
  food_id: number;
  food_image: string;
  food_name: string;
  description: string;
  price: string | number;
  food_category: FoodCategoryColumns;
  food_status: FoodStatusColumns;
  created_at: string;
  updated_at: string;
}

export interface FoodFieldsErrors {
  food_image?: string[];
  food_name?: string[];
  description?: string[];
  price?: string[];
  category?: string[];
  status?: string[];
}
