"use client";

import AddFoodModal from "@/features/food_management/AddFoodModal";
import FoodsTable from "@/features/food_management/FoodsTable";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useState } from "react";

export default function FoodManagementPage() {
  const { reload, handleReload } = useReload();
  const { showToastMessage } = useToastMessage();

  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">
        Food Management
      </h1>

      <AddFoodModal
        isOpen={isAddFoodModalOpen}
        onRoomAdded={(status, message) => showToastMessage(status, message)}
        onReloadFoods={handleReload}
        onClose={() => setIsAddFoodModalOpen(false)}
      />

      <FoodsTable onFoodAdd={() => setIsAddFoodModalOpen(true)} />
    </>
  );
}
