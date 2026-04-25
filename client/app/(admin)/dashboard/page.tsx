"use client";

import BookingSummaryCard from "@/features/dashboard/BookingSummaryCard";
import TopRoomsBookedList from "@/features/dashboard/TopRoomsBookedList";
import { RoomColumns } from "@/interfaces/RoomInterface";
import DashboardService from "@/services/DashboardService";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalPending, setTotalPending] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [roomsData, setRoomsData] = useState<RoomColumns[]>([]);

  const handleLoadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);

      const { status, data } = await DashboardService.loadDashboard();

      if (status !== 200) {
        console.error(
          "Unexpected status error during count booking statuses at SummaryCard.tsx: ",
          status,
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

      setRoomsData(data.rooms);
    } catch (error) {
      console.error(
        "Unexpected server error during count booking statuses at SummaryCard.tsx: ",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadDashboard();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-gray-800 font-semibold mb-4">Dashboard</h1>

      <div className="mb-4">
        <BookingSummaryCard
          isLoading={isLoading}
          totalPending={totalPending}
          totalApproved={totalApproved}
          totalCancelled={totalCancelled}
          totalCompleted={totalCompleted}
        />
      </div>

      <div className="mb-4">
        <TopRoomsBookedList isLoading={isLoading} roomsData={roomsData} />
      </div>
    </>
  );
}
