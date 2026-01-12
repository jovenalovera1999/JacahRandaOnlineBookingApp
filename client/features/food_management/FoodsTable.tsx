"use client";

import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
import Button from "@/components/ui/Button";
import FloatingLabelSelectField from "@/components/ui/FloatingLabelSelectField";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { useNumberDecimalFormat } from "@/hooks/useNumberFormat";
import { FoodColumns } from "@/interfaces/FoodInterface";
import FoodService from "@/services/FoodService";
import { useCallback, useEffect, useState } from "react";

interface FoodsTableProps {
  refreshFoods: boolean;
  onAddFood: () => void;
  // onEditFood: (selectedFood: FoodColumns | null) => void;
  // onDeleteFood: (selectedFood: FoodColumns | null) => void;
}

export default function FoodsTable({
  refreshFoods,
  onAddFood,
}: // onEditFood,
// onDeleteFood,
FoodsTableProps) {
  const [foods, setFoods] = useState<FoodColumns[]>([]);

  const [foodsActionOpenDropdown, setFoodsActionOpenDropdown] = useState<
    string | number | null
  >(null);

  const headers = ["No", "Food", "Description", "Price", "Status", "Action"];

  const handleLoadFoods = useCallback(async () => {
    try {
      const { status, data } = await FoodService.loadFoods();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load foods at FoodsTable.tsx: ",
          status
        );
        return;
      }

      setFoods(data.foods);
    } catch (error) {
      console.error(
        "Unexpected server error during load foods at FoodsTable.tsx: ",
        error
      );
    }
  }, []);

  useEffect(() => {
    handleLoadFoods();
  }, [refreshFoods, handleLoadFoods]);

  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-transparent">
        <div className="relative max-w-full max-h-[calc(100vh-11rem)] overflow-x-auto custom-scrollbar">
          <Table
            filter={
              <>
                <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
                  <div className="md:w-32">
                    <Button tag="button" type="button" onClick={onAddFood}>
                      Add Food
                    </Button>
                  </div>
                  <div className="md:w-72">
                    <FloatingLabelSelectField
                      label="Filter"
                      name="filter"
                      autoFocus
                    >
                      <option value="">All Foods Status</option>
                    </FloatingLabelSelectField>
                  </div>
                </div>
              </>
            }
          >
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    className="bg-blue-100 text-blue-600"
                    isHeader
                    key={header}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food, index) => (
                <TableRow className="hover:bg-gray-100" key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{food.food_name}</TableCell>
                  <TableCell>{food.description}</TableCell>
                  <TableCell>
                    {useNumberDecimalFormat(food.price.toString())}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        food.food_status.food_status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {food.food_status.food_status}
                    </span>
                  </TableCell>
                  <TableCell className="relative overflow-visible">
                    <ActionButtonDropdown
                      id={food.food_id}
                      openDropdownId={foodsActionOpenDropdown}
                      setOpenDropdownId={setFoodsActionOpenDropdown}
                    >
                      <Button
                        tag="button"
                        type="button"
                        className="bg-transparent text-gray-800 hover:bg-green-200 hover:text-green-600 text-xs font-medium transition-colors duration-200 w-20"
                        // onClick={() => onEditFood(food)}
                      >
                        Edit
                      </Button>
                      <Button
                        tag="button"
                        type="button"
                        className="bg-transparent text-gray-800 hover:bg-red-200 hover:text-red-600 text-xs font-medium transition-colors duration-200 w-20"
                        // onClick={() => onDeleteFood(food)}
                      >
                        Delete
                      </Button>
                    </ActionButtonDropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
