"use client";

import RoomCard from "@/features/home/RoomCard";
import Spinner from "@/components/ui/Spinner";
import { RoomColumns } from "@/interfaces/RoomInterface";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function RoomList() {
  const [rooms, setRooms] = useState<RoomColumns[]>([]);

  const handleLoadRooms = useCallback(async () => {
    try {
      const { status, data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/room/loadAvailableRooms`,
        { withCredentials: false }
      );

      if (status !== 200) {
        console.error(
          "Unexpected status error during load rooms at RoomList.tsx: ",
          status
        );
        return;
      }

      setRooms(data.rooms);
    } catch (error) {
      console.error(
        "Unexpected server error during load rooms at RoomList.tsx: ",
        error
      );
    }
  }, []);

  useEffect(() => {
    handleLoadRooms();
  }, []);

  if (rooms.length > 0) {
    return (
      <>
        <section className="mt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-800">
                Book a Room
              </h1>
              <p className="text-gray-500 mt-1">
                Choose from our available rooms and enjoy your stay
              </p>
              <div className="h-px bg-gray-200 mt-4" />
            </div>

            {/* Responsive Card Grid */}
            <div
              className="
            grid
            gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
            >
              {rooms.map((room) => (
                <RoomCard
                  key={room.room_id}
                  imageFileUrl={room.room_image}
                  roomNo={room.room_no}
                  roomType={room.room_type.room_type}
                  description={room.description ?? ""}
                  price={room.price}
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    </>
  );
}
