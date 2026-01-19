"use client";

import Button from "@/components/ui/Button";
import FloatingLabelInputField from "@/components/ui/FloatingLabelInputField";
import FloatingLabelTextareaField from "@/components/ui/FloatingLabelTextareaField";
import Form from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import UploadField from "@/components/ui/UploadField";
import { FoodColumns } from "@/interfaces/FoodInterface";
import FoodService from "@/services/FoodService";
import { FormEvent, useEffect, useState } from "react";

interface EditFoodModalProps {
  isOpen: boolean;
  selectedFood: FoodColumns | null;
  onRoomDeleted: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadFoods: () => void;
  onClose: () => void;
}

export default function DeleteFoodModal({
  isOpen,
  selectedFood,
  onRoomDeleted,
  onReloadFoods,
  onClose,
}: EditFoodModalProps) {
  const [isDestroying, setIsDestroying] = useState(false);
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

  const handleDestroyFood = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsDestroying(true);

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

      const { status, data } = await FoodService.destroyFood(foodId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during store food at AddFoodModal.tsx: ",
          status
        );
        return;
      }

      onRoomDeleted("success", data.message);
      onReloadFoods();

      onClose();
    } catch (error: any) {
      console.error(
        "Unexpected server error during store food at AddFoodModal.tsx: ",
        error
      );
    } finally {
      setIsDestroying(false);
    }
  };

  useEffect(() => {
    if (isOpen && selectedFood) {
      setFoodId(selectedFood.food_id);
      setExistingFoodImage(selectedFood.food_image ?? null);
      setFoodName(selectedFood.food_name);
      setDescription(selectedFood.description);
      setPrice(selectedFood.price.toString());
      setCategory(selectedFood.food_category.food_category);
      setFoodStatus(selectedFood.food_status.food_status);
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
        <Form onSubmit={handleDestroyFood}>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="mb-5 w-full">
              <UploadField
                label="Food Image"
                labelFile="PNG, JPG or JPEG"
                name="food_image"
                value={editFoodImage}
                existingFileUrl={existingFoodImage}
                alt="Food Image"
                readOnly
              />
            </div>
            <div className="mb-5 w-full">
              <FloatingLabelInputField
                label="Food Name"
                type="text"
                name="food_name"
                value={foodName}
                readOnly
              />
            </div>
            <div className="mb-5 w-full">
              <FloatingLabelTextareaField
                label="Description"
                name="description"
                value={description}
                readOnly
              />
            </div>
            <div className="mb-5 w-full">
              <FloatingLabelInputField
                label="Price"
                type="text"
                name="price"
                value={price}
                readOnly
              />
            </div>
            <div className="mb-5 w-full">
              <FloatingLabelInputField
                label="Category"
                type="text"
                name="category"
                value={category}
                readOnly
              />
            </div>
            <div className="w-full">
              <FloatingLabelInputField
                label="Status"
                type="text"
                name="status"
                value={foodStatus}
                readOnly
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isDestroying && (
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
                isDestroying ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
            >
              <Button
                tag="button"
                type="submit"
                className="bg-red-600 border-none text-white hover:bg-red-800"
                isLoading={isDestroying}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>Deleting Food...</span>
                  </>
                }
              >
                Delete
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
