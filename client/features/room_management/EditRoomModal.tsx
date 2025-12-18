import { RoomColumns } from "@/interfaces/RoomInterface";

interface EditRoomModal {
  selectedRoom: RoomColumns | null;
  isOpen: boolean;
  reloadRoomReferences: boolean;
  onRoomUpdated: (
    status: "success" | "failed" | "warning" | "others",
    message: string
  ) => void;
  onReloadRooms: () => void;
}

export default function EditRoomModal() {}
