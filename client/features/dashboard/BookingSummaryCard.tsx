"use client";

import DashboardService from "@/services/DashboardService";
import { useCallback, useEffect, useState } from "react";

export default function BookingSummaryCard() {
  const [totalPending, setTotalPending] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  const handleCountPendingAvailableCancelledOccupied = useCallback(async () => {
    try {
      const { status, data } =
        await DashboardService.countPendingApprovedCancelledCompleted();

      if (status !== 200) {
        console.error(
          "Unexpected status error during count booking statuses at SummaryCard.tsx: ",
          status
        );
        return;
      }

      data.countByBookingStatuses.map((item: any) => {
        switch (item.booking_status) {
          case "Pending":
            setTotalPending(item.bookings_count);
            break;
          case "Approved":
            setTotalApproved(item.bookings_count);
            break;
          case "Cancelled":
            setTotalCancelled(item.bookings_count);
            break;
          case "Occupied":
            setTotalCompleted(item.bookings_count);
            break;
        }
      });
    } catch (error) {
      console.error(
        "Unexpected server error during count booking statuses at SummaryCard.tsx: ",
        error
      );
    }
  }, []);

  const cards = [
    { title: "Pending", value: totalPending },
    { title: "Approved", value: totalApproved },
    { title: "Cancelled", value: totalCancelled },
    { title: "Completed", value: totalCompleted },
  ];

  useEffect(() => {
    handleCountPendingAvailableCancelledOccupied();
  }, [handleCountPendingAvailableCancelledOccupied]);

  return (
    <>
      <h1 className="text-xl text-gray-800 font-semibold mb-2">
        Booking Summary
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          // Determine color classes based on title
          const colorClass =
            card.title === "Approved"
              ? "bg-green-100 text-green-700"
              : card.title === "Cancelled"
              ? "bg-red-100 text-red-700"
              : card.title === "Completed"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700";

          return (
            <div
              className={`flex flex-col justify-between rounded-lg border border-gray-200 p-6 shadow-sm w-full ${colorClass}`}
              key={card.title}
            >
              <div className="text-sm font-medium">{card.title}</div>
              <div className="flex justify-end text-3xl font-semibold mt-2">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
