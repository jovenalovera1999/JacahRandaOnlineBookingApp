import api from "@/lib/axios";

const RoomService = {
  loadRoomReferences: async () => {
    const response = await api.get("/room/loadRoomReferences");
    return response;
  },
  storeRoom: async (data: any) => {
    const response = await api.post("/room/storeRoom", data);
    return response;
  },
};

export default RoomService;
