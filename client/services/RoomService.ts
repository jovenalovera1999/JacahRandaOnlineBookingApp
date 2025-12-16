import api from "@/lib/axios";

const RoomService = {
  loadRoomReferences: async () => {
    const response = api.get("/room/loadRoomReferences");
    return response;
  },
  loadRooms: async () => {
    const response = api.get("/room/loadRooms");
    return response;
  },
};

export default RoomService;
