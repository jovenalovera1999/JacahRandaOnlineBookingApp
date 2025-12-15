import { RoomColumns } from "@/interfaces/RoomInterface";
import api from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";

export default function useRooms(initialRooms: RoomColumns[]) {
  const [rooms, setRooms] = useState<RoomColumns[]>(initialRooms);

  async function handleReloadRooms() {
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/room/loadRooms`
      );

      if (res.status !== 200) {
        console.error(
          "Unexpected status error reloading rooms at useRooms: ",
          res.status
        );
        return;
      }

      setRooms(res.data.rooms);
    } catch (error) {
      console.error(
        "Unexpected server error reloading rooms at useRooms: ",
        error
      );
    }

    return { rooms, setRooms, handleReloadRooms };
  }
}
