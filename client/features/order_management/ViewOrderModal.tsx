import { Modal } from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { useNumberDecimalFormat } from "@/hooks/useNumberFormat";
import { FoodCartColumns } from "@/interfaces/FoodCartInterface";
import { OrderColumns } from "@/interfaces/OrderInterface";
import FoodCartService from "@/services/FoodCartService";
import { FormEvent, useCallback, useEffect, useState } from "react";
import CardComponent from "@/components/ui/CardComponent";
import Form from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import OrderService from "@/services/OrderService";

interface ViewOrderModalProps {
  selectedOrder: OrderColumns | null;
  onOrderPreparing: (
    status: "success" | "warning" | "failed" | "others",
    message: string,
  ) => void;
  onOrderServing: (
    status: "success" | "warning" | "failed" | "others",
    message: string,
  ) => void;
  onOrderServed: (
    status: "success" | "warning" | "failed" | "others",
    message: string,
  ) => void;
  handleRefreshSelectedOrder: (orderId: string | Number) => void;
  handleReloadOrders: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewOrderModal({
  selectedOrder,
  onOrderPreparing,
  onOrderServing,
  onOrderServed,
  handleRefreshSelectedOrder,
  handleReloadOrders,
  isOpen,
  onClose,
}: ViewOrderModalProps) {
  const [isFoodCartsLoading, setIsFoodCartsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [foodCarts, setFoodCarts] = useState<FoodCartColumns[]>([]);
  const [orderId, setOrderId] = useState(0);

  const handleLoadFoodCarts = useCallback(async (orderId: string | Number) => {
    try {
      const { status, data } = await FoodCartService.loadFoodCarts(orderId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during load food carts at ViewOrderModal.tsx: ",
          status,
        );
        return;
      }

      setFoodCarts(data.foodCarts);
    } catch (error: any) {
      console.error(
        "Unexpected server error during load food carts at ViewOrderModal.tsx: ",
        error,
      );
    } finally {
      setIsFoodCartsLoading(false);
    }
  }, []);

  const handleUpdateOrderToPreparing = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsUpdating(true);

      const { status, data } =
        await OrderService.updateOrderToPreparing(orderId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during update order to preparing at ViewOrderModal.tsx: ",
          status,
        );
        return;
      }

      onOrderPreparing("success", data.message);

      handleRefreshSelectedOrder(orderId);
      handleReloadOrders();
    } catch (error: any) {
      console.error(
        "Unexpected server error during update order to preparing at ViewOrderModal.tsx: ",
        error,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateOrderToServing = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsUpdating(true);

      const { status, data } = await OrderService.updateOrderToServing(orderId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during update order to serving at ViewOrderModal.tsx: ",
          status,
        );
        return;
      }

      onOrderServing("success", data.message);

      handleRefreshSelectedOrder(orderId);
      handleReloadOrders();
    } catch (error: any) {
      console.error(
        "Unexpected server error during update order to serving at ViewOrderModal.tsx: ",
        error,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateOrderToServed = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsUpdating(true);

      const { status, data } = await OrderService.updateOrderToServed(orderId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during update order to served at ViewOrderModal.tsx: ",
          status,
        );
        return;
      }

      onOrderServed("success", data.message);

      handleRefreshSelectedOrder(orderId);
      handleReloadOrders();
    } catch (error: any) {
      console.error(
        "Unexpected server error during update order to served at ViewOrderModal.tsx: ",
        error,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const headers = ["Food", "Quantity", "Subtotal"];

  useEffect(() => {
    if (isOpen && selectedOrder) {
      setOrderId(selectedOrder.order_id);
    }
  }, [isOpen, selectedOrder]);

  useEffect(() => {
    if (isOpen && selectedOrder) {
      handleLoadFoodCarts(selectedOrder.order_id);
    }
  }, [isOpen, selectedOrder, handleLoadFoodCarts]);

  useEffect(() => {
    if (!isOpen) {
      setOrderId(0);
    }
  }, [isOpen]);

  return (
    <>
      <Modal title="Order Details" isOpen={isOpen} onClose={onClose}>
        <Form
          onSubmit={
            selectedOrder?.order_status.order_status === "Pending"
              ? handleUpdateOrderToPreparing
              : selectedOrder?.order_status.order_status === "Preparing"
                ? handleUpdateOrderToServing
                : handleUpdateOrderToServed
          }
        >
          <CardComponent title="Customer Details">
            <div className="grid grid-cols-1 gap-6 px-6 py-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Name</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selectedOrder?.booking.user.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selectedOrder?.booking.user.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Room No.</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selectedOrder?.booking.room.room_no}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Status</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedOrder?.order_status.order_status === "Pending"
                        ? "bg-orange-100 text-orange-800"
                        : selectedOrder?.order_status.order_status ===
                            "Preparing"
                          ? "bg-violet-100 text-violet-800"
                          : selectedOrder?.order_status.order_status ===
                              "Serving"
                            ? "bg-blue-100 text-blue-800"
                            : selectedOrder?.order_status.order_status ===
                                "Served"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedOrder?.order_status.order_status}
                  </span>
                </p>
              </div>
            </div>
          </CardComponent>
          <CardComponent title="Ordered Foods">
            <div className="p-5 mb-5">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-transparent">
                <div className="relative max-w-full max-h-[calc(100vh-11rem)] overflow-x-auto custom-scrollbar">
                  <Table>
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
                      {isFoodCartsLoading ? (
                        <TableRow>
                          <TableCell
                            colSpan={headers.length}
                            className="text-center"
                          >
                            <Spinner size="md" />
                          </TableCell>
                        </TableRow>
                      ) : foodCarts.length <= 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={headers.length}
                            className="text-center"
                          >
                            No Ordered Foods Yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        foodCarts.map((foodCart, index) => (
                          <TableRow className="hover:bg-gray-100" key={index}>
                            <TableCell className="px-4 py-3">
                              <p className="font-medium text-gray-800">
                                {foodCart.food.food_name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₱{useNumberDecimalFormat(foodCart.price)}
                              </p>
                            </TableCell>

                            <TableCell className="px-4 py-3 text-center">
                              {foodCart.quantity.toString()}
                            </TableCell>

                            <TableCell className="px-4 py-3 text-right font-medium">
                              ₱
                              {useNumberDecimalFormat(
                                Number(foodCart.price) *
                                  Number(foodCart.quantity),
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardComponent>
          {selectedOrder?.order_status.order_status !== "Served" && (
            <div className="flex items-center justify-center">
              <Button
                tag="button"
                type="submit"
                isLoading={isUpdating}
                isLoadingChildren={
                  <>
                    <Spinner size="xs" />
                    <span>
                      {selectedOrder?.order_status.order_status === "Pending"
                        ? "Setting to Preparing..."
                        : selectedOrder?.order_status.order_status ===
                            "Preparing"
                          ? "Setting to Serving..."
                          : "Setting to Served..."}
                    </span>
                  </>
                }
              >
                {selectedOrder?.order_status.order_status === "Pending"
                  ? "Set to Preparing"
                  : selectedOrder?.order_status.order_status === "Preparing"
                    ? "Set to Serving"
                    : "Set to Served"}
              </Button>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
}
