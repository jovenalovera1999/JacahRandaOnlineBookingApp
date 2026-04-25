"use client";

import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { OrderColumns } from "@/interfaces/OrderInterface";
import OrderService from "@/services/OrderService";
import { useCallback, useEffect, useState } from "react";

interface OrdersTableProps {
  reloadOrders: boolean;
  onViewOrder: (selectedOrder: OrderColumns | null) => void;
}

export default function OrdersTable({
  reloadOrders,
  onViewOrder,
}: OrdersTableProps) {
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [orders, setOrders] = useState<OrderColumns[]>([]);

  const [foodsActionOpenDropdown, setFoodsActionOpenDropdown] = useState<
    string | number | null
  >(null);

  const headers = ["No", "Customer's Name", "Room No.", "Status", "Action"];

  const handleLoadOrders = useCallback(async () => {
    try {
      const { status, data } = await OrderService.loadOrders();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load foods at FoodsTable.tsx: ",
          status,
        );
        return;
      }

      setOrders(data.orders);
    } catch (error) {
      console.error(
        "Unexpected server error during load foods at FoodsTable.tsx: ",
        error,
      );
    } finally {
      setIsOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadOrders();
  }, [reloadOrders, handleLoadOrders]);

  return (
    <>
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
              {isOrdersLoading ? (
                <TableRow>
                  <TableCell colSpan={headers.length} className="text-center">
                    <Spinner size="md" />
                  </TableCell>
                </TableRow>
              ) : orders.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={headers.length} className="text-center">
                    No Orders Yet
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow className="hover:bg-gray-100" key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.booking.user.name}</TableCell>
                    <TableCell>{order.booking.room.room_no}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order?.order_status.order_status === "Pending"
                            ? "bg-orange-100 text-orange-800"
                            : order?.order_status.order_status === "Preparing"
                              ? "bg-violet-100 text-violet-800"
                              : order?.order_status.order_status === "Serving"
                                ? "bg-blue-100 text-blue-800"
                                : order?.order_status.order_status === "Served"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.order_status.order_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        tag="button"
                        type="button"
                        className="bg-transparent text-gray-800 hover:bg-blue-200 hover:text-blue-600 text-xs font-medium transition-colors duration-200 w-28"
                        onClick={() => onViewOrder(order)}
                      >
                        View Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
