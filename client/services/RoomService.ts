import api from "@/lib/axios";

const RoomService = {
  loadRoomReferences: async () => {
    const response = await api.get("/room/loadRoomReferences");
    return response;
  },
  loadRooms: async () => {
    const response = await api.get("/room/loadRooms");
    return response;
  },
  storeRoom: async (data: any) => {
    const response = await api.post("/room/storeRoom", data);
    return response;
  },
  updateRoom: async (roomId: string | number, data: any) => {
    const response = await api.post(`/room/updateRoom/${roomId}`, data);
    return response;
  },
};

export default RoomService;
