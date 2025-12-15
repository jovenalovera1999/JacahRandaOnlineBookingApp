import { Metadata } from "next";
import RoomManagementPage from "./page";
import { RoomColumns } from "@/interfaces/RoomInterface";
import { RoomTypeColumns } from "@/interfaces/RoomTypeInterface";
import { RoomStatusColumns } from "@/interfaces/RoomStatusInterface";

export const metadata: Metadata = {
  title: "Room Management",
};

async function loadRooms(): Promise<RoomColumns[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/loadRooms`);

  if (res.status !== 200) {
    console.error(
      "Unexpected status error during load rooms at room_management/layout: ",
      res.status
    );
  }

  const json = await res.json();
  return json.rooms as RoomColumns[];
}

async function loadRoomReferences(): Promise<{
  roomTypes: RoomTypeColumns[];
  roomStatuses: RoomStatusColumns[];
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/room/loadRoomReferences`
    );

    if (res.status !== 200) {
      console.error(
        "Unexpected status error during load room references at room_management/layout: ",
        res.status
      );

      return { roomTypes: [], roomStatuses: [] };
    }

    const json = await res.json();
    return {
      roomTypes: json.roomTypes as RoomTypeColumns[],
      roomStatuses: json.roomStatuses as RoomStatusColumns[],
    };
  } catch (error) {
    console.error(
      "Unexpected server error during load room references at room_management/layout: ",
      error
    );

    return { roomTypes: [], roomStatuses: [] };
  }
}

export default async function RoomManagementLayout() {
  const rooms = await loadRooms();
  const roomReferences = await loadRoomReferences();

  return (
    <>
      <RoomManagementPage
        rooms={rooms}
        roomTypes={roomReferences?.roomTypes}
        roomStatuses={roomReferences?.roomStatuses}
      />
    </>
  );
}
