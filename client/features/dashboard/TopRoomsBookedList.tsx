"use client";

import { RoomColumns } from "@/interfaces/RoomInterface";
import RoomCard from "./RoomCard";

interface TopRoomsBookedListProps {
  isLoading: boolean;
  roomsData: RoomColumns[];
}

export default function TopRoomsBookedList({
  isLoading,
  roomsData,
}: TopRoomsBookedListProps) {
  return (
    <>
      <h1 className="text-xl text-gray-800 font-semibold mb-2">
        Top 5 Rooms Booked
      </h1>
      {roomsData.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomsData.map((room) => (
            <RoomCard key={room.room_id} room={room} />
          ))}
        </div>
      )}
    </>
  );
}
