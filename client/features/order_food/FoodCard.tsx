import { FoodColumns } from "@/interfaces/FoodInterface";
import { useState } from "react";
import NoImage from "@/public/img/ui/NoImage.png";
import { useNumberDecimalFormat } from "@/hooks/useNumberFormat";
import Button from "@/components/ui/Button";

interface FoodCardProps {
  food: FoodColumns;
  onAddToCart: (food: FoodColumns, quantity: number) => void;
}

export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart(food, quantity);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
        {/* Image */}
        <div className="h-40 bg-gray-100 overflow-hidden">
          <img
            src={food.food_image ?? NoImage}
            alt={food.food_name}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {food.food_name}
          </h3>

          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {food.description}
          </p>

          <div className="mt-3 text-lg font-bold text-blue-600">
            ₱{useNumberDecimalFormat(food.price.toString())}
          </div>

          {/* Quantity + CTA */}
          <div className="mt-auto pt-4 space-y-3">
            {/* Quantity Control */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Quantity
              </span>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrease}
                  disabled={quantity === 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                >
                  −
                </button>

                <span className="px-4 py-1 text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={handleIncrease}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              tag="button"
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
