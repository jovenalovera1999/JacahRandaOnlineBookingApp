"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { FoodCategoryColumns } from "@/interfaces/FoodCategory";
import { FoodColumns, FoodFieldsErrors } from "@/interfaces/FoodInterface";
import { FoodStatusColumns } from "@/interfaces/FoodStatusInterface";
import FoodService from "@/services/FoodService";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface EditFoodModalProps {
  isOpen: boolean;
  selectedFood: FoodColumns | null;
  onRoomUpdated: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadFoods: () => void;
  onClose: () => void;
}

export default function EditFoodModal({
  isOpen,
  selectedFood,
  onRoomUpdated,
  onReloadFoods,
  onClose,
}: EditFoodModalProps) {
  const [foodCategories, setFoodCategories] = useState<FoodCategoryColumns[]>(
    []
  );
  const [foodStatuses, setFoodStatuses] = useState<FoodStatusColumns[]>([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [foodId, setFoodId] = useState(0);
  const [existingFoodImage, setExistingFoodImage] = useState<string | null>(
    null
  );
  const [editFoodImage, setEditFoodImage] = useState<File | null>(null);
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foodStatus, setFoodStatus] = useState("");
  const [errors, setErrors] = useState<FoodFieldsErrors>({});

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

  const handleUpdateFood = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsUpdating(true);

      const formData = new FormData();
      formData.append("_method", "PUT");

      editFoodImage
        ? formData.append("food_image", editFoodImage)
        : !existingFoodImage && !editFoodImage
        ? formData.append("food_image_removed", "1")
        : formData.append("food_image", "");

      formData.append("food_name", foodName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("status", foodStatus);

      const { status, data } = await FoodService.updateFood(foodId, formData);

      if (status !== 200) {
        console.error(
          "Unexpected status error during store food at AddFoodModal.tsx: ",
          status
        );
        return;
      }

      onRoomUpdated("success", data.message);
      onReloadFoods();

      setErrors({});
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Unexpected server error during store food at AddFoodModal.tsx: ",
          error
        );
        return;
      }

      setErrors(error.response.data.errors);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isOpen) handleLoadFoodReferences();
  }, [isOpen, handleLoadFoodReferences]);

  useEffect(() => {
    if (isOpen && selectedFood) {
      setFoodId(selectedFood.food_id);
      setExistingFoodImage(selectedFood.food_image ?? null);
      setFoodName(selectedFood.food_name);
      setDescription(selectedFood.description);
      setPrice(selectedFood.price.toString());
      setCategory(selectedFood.food_category.food_category_id.toString());
      setFoodStatus(selectedFood.food_status.food_status_id.toString());
    }
  }, [isOpen, selectedFood]);

  useEffect(() => {
    if (!isOpen) {
      setFoodId(0);
      setExistingFoodImage(null);
      setEditFoodImage(null);
      setFoodName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setFoodStatus("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal title="Edit Food" isOpen={isOpen} onClose={onClose}>
        {foodCategories.length > 0 && foodStatuses.length > 0 ? (
          <>
            <Form onSubmit={handleUpdateFood}>
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="mb-5 w-full">
                  <UploadField
                    label="Food Image"
                    labelFile="PNG, JPG or JPEG"
                    name="food_image"
                    value={editFoodImage}
                    onChange={setEditFoodImage}
                    existingFileUrl={existingFoodImage}
                    alt="Food Image"
                    errors={errors.food_image}
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelInputField
                    label="Food Name"
                    type="text"
                    name="food_name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                    autoFocus
                    errors={errors.food_name}
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelTextareaField
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    errors={errors.description}
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelInputField
                    label="Price"
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    errors={errors.price}
                  />
                </div>
                <div className="mb-5 w-full">
                  <FloatingLabelSelectField
                    label="Category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    errors={errors.category}
                  >
                    <option value="">Select Food Category</option>f
                    {foodCategories.map((foodCategory, index) => (
                      <option value={foodCategory.food_category_id} key={index}>
                        {foodCategory.food_category}
                      </option>
                    ))}
                  </FloatingLabelSelectField>
                </div>
                <div className="w-full">
                  <FloatingLabelSelectField
                    label="Status"
                    name="status"
                    value={foodStatus}
                    onChange={(e) => setFoodStatus(e.target.value)}
                    required
                    errors={errors.status}
                  >
                    <option value="">Select Food Status</option>
                    {foodStatuses.map((foodStatus, index) => (
                      <option value={foodStatus.food_status_id} key={index}>
                        {foodStatus.food_status}
                      </option>
                    ))}
                  </FloatingLabelSelectField>
                </div>
              </div>
              {/* Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!isUpdating && (
                  <div className="col-span-1">
                    <Button
                      tag="button"
                      onClick={onClose}
                      className="bg-white border-gray-100 text-gray-800 hover:bg-gray-100 focus:ring-0"
                    >
                      Close
                    </Button>
                  </div>
                )}

                <div
                  className={`${
                    isUpdating ? "col-span-1 md:col-span-2" : "col-span-1"
                  }`}
                >
                  <Button
                    tag="button"
                    type="submit"
                    isLoading={isUpdating}
                    isLoadingChildren={
                      <>
                        <Spinner size="xs" />
                        <span>Updating Food...</span>
                      </>
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </>
        ) : (
          <>
            <div className="fixed inset-0 flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
