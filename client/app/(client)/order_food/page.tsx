"use client";

import FoodCart from "@/features/order_food/FoodCart";
import FoodsGrid from "@/features/order_food/FoodsGrid";
import { FoodColumns } from "@/interfaces/FoodInterface";
import { useState } from "react";

export interface FoodCartItem {
  food_id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderFoodPage() {
  const [cartItems, setCartItems] = useState<FoodCartItem[]>([]);

  const handleAddToCart = (food: FoodColumns, quantity: number) => {
    const price = Number(food.price);

    if (Number.isNaN(price)) {
      console.error("Invalid food price:", food.price);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.food_id === food.food_id);

      if (existing) {
        return prev.map((item) =>
          item.food_id === food.food_id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          food_id: food.food_id,
          name: food.food_name,
          price,
          quantity,
        },
      ];
    });
  };

  const handleRemoveFromCart = (food_id: number) => {
    setCartItems((prev) => prev.filter((item) => item.food_id !== food_id));
  };

  const handleRemoveAllFromCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <div className="relative flex">
        <main className="flex-1 pr-0 lg:pr-[440px]">
          <FoodsGrid onAddToCart={handleAddToCart} />
        </main>

        <FoodCart
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleRemoveAllFromCart}
        />
      </div>
    </>
  );
}
