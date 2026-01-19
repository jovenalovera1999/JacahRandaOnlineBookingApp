"use client";

import AddFoodModal from "@/features/food_management/AddFoodModal";
import DeleteFoodModal from "@/features/food_management/DeleteFoodModal";
import EditFoodModal from "@/features/food_management/EditFoodModal";
import FoodsTable from "@/features/food_management/FoodsTable";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { FoodColumns } from "@/interfaces/FoodInterface";
import { useState } from "react";

export default function FoodManagementPage() {
  const { reload, handleReload } = useReload();
  const { showToastMessage } = useToastMessage();

  const [selectedFood, setSelectedFood] = useState<FoodColumns | null>(null);

  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
  const [isDeleteFoodModalOpen, setIsDeleteFoodModalOpen] = useState(false);

  const handleOpenEditFoodModal = (foodSelected: FoodColumns | null) => {
    setSelectedFood(foodSelected);
    setIsEditFoodModalOpen(true);
  };

  const handleCloseEditFoodModal = () => {
    setSelectedFood(null);
    setIsEditFoodModalOpen(false);
  };

  const handleOpenDeleteFoodModal = (foodSelected: FoodColumns | null) => {
    setSelectedFood(foodSelected);
    setIsDeleteFoodModalOpen(true);
  };

  const handleCloseDeleteFoodModal = () => {
    setSelectedFood(null);
    setIsDeleteFoodModalOpen(false);
  };

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

      <EditFoodModal
        isOpen={isEditFoodModalOpen}
        selectedFood={selectedFood}
        onRoomUpdated={(status, message) => showToastMessage(status, message)}
        onReloadFoods={handleReload}
        onClose={handleCloseEditFoodModal}
      />

      <DeleteFoodModal
        isOpen={isDeleteFoodModalOpen}
        selectedFood={selectedFood}
        onRoomDeleted={(status, message) => showToastMessage(status, message)}
        onReloadFoods={handleReload}
        onClose={handleCloseDeleteFoodModal}
      />

      <FoodsTable
        refreshFoods={reload}
        onAddFood={() => setIsAddFoodModalOpen(true)}
        onEditFood={handleOpenEditFoodModal}
        onDeleteFood={handleOpenDeleteFoodModal}
      />
    </>
  );
}
