"use client";
import Spinner from "@/components/ui/Spinner";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { useCallback, useEffect, useState } from "react";
import RoomService from "@/services/RoomService";
import RoomCard from "./RoomCard";

interface RoomListProps {
  id: string;
  onBookRoom: (selectedRoom: RoomColumns | null) => void;
  reloadAvailableRooms: boolean;
}

export default function RoomList({
  id,
  onBookRoom,
  reloadAvailableRooms,
}: RoomListProps) {
  const [rooms, setRooms] = useState<RoomColumns[]>([]);

  const handleLoadRooms = useCallback(async () => {
    try {
      const { status, data } = await RoomService.loadAvailableRooms();

      if (status !== 200) {
        console.error(
          "Unexpected status error during load rooms at RoomList.tsx: ",
          status
        );
        return;
      }

      setRooms(data.rooms ?? []);
    } catch (error) {
      console.error(
        "Unexpected server error during load rooms at RoomList.tsx: ",
        error
      );
    }
  }, []);

  useEffect(() => {
    handleLoadRooms();
  }, [reloadAvailableRooms, handleLoadRooms]);

  if (rooms.length > 0) {
    return (
      <>
        <section
          id={id || "room_list"}
          className="scroll-mt-24 mt-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-12 max-w-2xl">
              <span className="text-sm uppercase tracking-widest text-gray-500">
                Stay Experience
              </span>
              <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800">
                Featured Rooms
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A thoughtfully curated selection of comfortable rooms at Jacah
                Randa Beach Cabanas, designed to provide a relaxing stay and
                enhance your seaside getaway.
              </p>
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
                  onBookRoom={(selectedRoom) => onBookRoom(selectedRoom)}
                  room={room}
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
