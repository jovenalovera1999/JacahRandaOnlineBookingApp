"use client";

import OrdersTable from "@/features/order_management/OrdersTable";
import ViewOrderModal from "@/features/order_management/ViewOrderModal";
import { useReload } from "@/hooks/useReload";
import { useToastMessage } from "@/hooks/useToastMessage";
import { OrderColumns } from "@/interfaces/OrderInterface";
import OrderService from "@/services/OrderService";
import { useState } from "react";

export default function OrderManagementPage() {
  const { reload, handleReload } = useReload();
  const { showToastMessage } = useToastMessage();

  const [selectedOrder, setSelectedOrder] = useState<OrderColumns | null>(null);
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);

  const handleOpenViewOrderModal = (orderSelected: OrderColumns | null) => {
    setSelectedOrder(orderSelected);
    setIsViewOrderModalOpen(true);
  };

  const handleCloseViewOrderModal = () => {
    setSelectedOrder(null);
    setIsViewOrderModalOpen(false);
  };

  const handleRefreshSelectedOrder = async (orderId: string | Number) => {
    try {
      const { status, data } = await OrderService.getOrder(orderId);

      if (status !== 200) {
        console.error(
          "Unexpected status error during get order at OrderManagementPage: ",
          status,
        );
        return;
      }

      setSelectedOrder(data.order);
    } catch (error: any) {
      console.error(
        "Unexpected server error during get order at OrderManagementPage: ",
        error,
      );
    }
  };

  return (
    <>
      <ViewOrderModal
        selectedOrder={selectedOrder}
        onOrderPreparing={(status, message) =>
          showToastMessage(status, message)
        }
        onOrderServing={(status, message) => {
          showToastMessage(status, message);
        }}
        onOrderServed={(status, message) => {
          showToastMessage(status, message);
        }}
        handleRefreshSelectedOrder={handleRefreshSelectedOrder}
        handleReloadOrders={handleReload}
        isOpen={isViewOrderModalOpen}
        onClose={handleCloseViewOrderModal}
      />

      <OrdersTable
        reloadOrders={reload}
        onViewOrder={handleOpenViewOrderModal}
      />
    </>
  );
}
