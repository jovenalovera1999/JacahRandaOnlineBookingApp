"use client";

import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { FoodCategoryColumns } from "@/interfaces/FoodCategory";
import { FoodStatusColumns } from "@/interfaces/FoodStatusInterface";
import FoodService from "@/services/FoodService";
import { useCallback, useEffect, useState } from "react";

interface AddFoodModalProps {
  isOpen: boolean;
  onRoomAdded: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadFoods: () => void;
  onClose: () => void;
}

export default function AddFoodModal({
  isOpen,
  onRoomAdded,
  onReloadFoods,
  onClose,
}: AddFoodModalProps) {
  const [foodCategories, setFoodCategories] = useState<FoodCategoryColumns[]>(
    []
  );
  const [foodStatuses, setFoodStatuses] = useState<FoodStatusColumns[]>([]);

  const handleLoadFoodReferences = useCallback(async () => {
    try {
      const { status, data } = await FoodService.loadFoodReferences();

      if (status != 200) {
        console.error(
          "Unexpected status error during load food references at AddFoodModal.tsx: ",
          status
        );
        return;
      }

      setFoodCategories(data.foodCategories);
      setFoodStatuses(data.foodStatuses);
    } catch (error) {
      console.error(
        "Unexpected server error during load food references at AddFoodModal.tsx: ",
        error
      );
    }
  }, []);

  useEffect(() => {
    handleLoadFoodReferences();
  }, []);

  return (
    <>
      <Modal title="Add Food" isOpen={isOpen} onClose={onClose}>
        <Form>
          {foodCategories.length <= 0 || foodStatuses.length <= 0 ? (
            <>
              <div className="fixed inset-0 flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-gray-200">
                <div className="mb-5 w-full">
                  <UploadField
                    label="Food Image"
                    labelFile="PNG, JPG or JPEG"
                    name="food_image"
                    alt="Food Image"
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelInputField
                    label="Food Name"
                    type="text"
                    name="food_name"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelTextareaField
                    label="Description"
                    name="description"
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelInputField
                    label="Price"
                    type="text"
                    name="price"
                    required
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelSelectField
                    label="Category"
                    name="food_category"
                    required
                  >
                    <option value="">Select Food Category</option>f
                    {foodCategories.map((foodCategory) => (
                      <option
                        value={foodCategory.food_category_id}
                        key={foodCategory.food_category_id}
                      >
                        {foodCategory.food_category}
                      </option>
                    ))}
                  </FloatingLabelSelectField>
                </div>
                <div className="w-full">
                  <FloatingLabelSelectField
                    label="Status"
                    name="food_status"
                    required
                  >
                    <option value="">Select Food Status</option>
                    {foodStatuses.map((foodStatus) => (
                      <option
                        value={foodStatus.food_status_id}
                        key={foodStatus.food_status_id}
                      >
                        {foodStatus.food_status}
                      </option>
                    ))}
                  </FloatingLabelSelectField>
                </div>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
