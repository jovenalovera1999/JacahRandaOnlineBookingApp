"use client";

import ActionButtonDropdown from "@/components/ui/ActionButtonDropdown";
import Button from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { OrderColumns } from "@/interfaces/OrderInterface";
import OrderService from "@/services/OrderSerivce";
import { useCallback, useEffect, useState } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderColumns[]>([]);

  const [foodsActionOpenDropdown, setFoodsActionOpenDropdown] = useState<
    string | number | null
  >(null);

  const headers = ["No", "Customer's Name", "Room No.", "Action"];

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

      setOrders(data.foods);
    } catch (error) {
      console.error(
        "Unexpected server error during load foods at FoodsTable.tsx: ",
        error,
      );
    }
  }, []);

  useEffect(() => {
    handleLoadOrders();
  }, [handleLoadOrders]);

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
              {orders.map((order, index) => (
                <TableRow className="hover:bg-gray-100" key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.booking.user.name}</TableCell>
                  <TableCell>{order.booking.room.room_no}</TableCell>
                  <TableCell className="relative overflow-visible">
                    <ActionButtonDropdown
                      id={order.order_id}
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
