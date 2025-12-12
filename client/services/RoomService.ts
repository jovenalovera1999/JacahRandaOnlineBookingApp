import api from "@/lib/axios";

const RoomService = {
  loadRoomReferences: async () => {
    const response = await api.get("/room/loadRoomReferences");
    return response;
  },
};

export default RoomService;
