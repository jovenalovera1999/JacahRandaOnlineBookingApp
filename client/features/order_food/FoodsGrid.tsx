import Spinner from "@/components/ui/Spinner";
import { FoodColumns } from "@/interfaces/FoodInterface";
import FoodService from "@/services/FoodService";
import { useCallback, useEffect, useState } from "react";
import FoodCard from "./FoodCard";

interface FoodsGridProps {
  onAddToCart: (food: FoodColumns, quantity: number) => void;
}

export default function FoodsGrid({ onAddToCart }: FoodsGridProps) {
  const [foods, setFoods] = useState<FoodColumns[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLoadFoods = useCallback(async () => {
    try {
      const res = await FoodService.loadFoods();

      if (res.status !== 200) {
        console.error(
          "Unexpected status error load foods at FoodsGrid.tsx: ",
          res.status,
        );
        return;
      }

      setFoods(res.data.foods);
    } catch (error) {
      console.error(
        "Unexpected server error load foods at FoodsGrid.tsx: ",
        error,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadFoods();
  }, [handleLoadFoods]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-sm uppercase tracking-widest text-gray-500">
            Food & Beverages
          </span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800">
            Order Delicious Meals
          </h2>
          <p className="mt-4 text-gray-600">
            Enjoy freshly prepared meals delivered straight to your room.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {foods.length > 0 &&
            foods.map((food, index) => (
              <FoodCard key={index} food={food} onAddToCart={onAddToCart} />
            ))}
        </div>
      </div>
    </section>
  );
}
