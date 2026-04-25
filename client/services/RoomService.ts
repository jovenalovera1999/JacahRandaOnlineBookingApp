import api from "@/lib/axios";

const RoomService = {
  loadAvailableRooms: async () => {
    return await api.get("/room/loadAvailableRooms");
  },
  loadRoomReferences: async () => {
    return await api.get(`/room/loadRoomReferences`);
  },
  loadRooms: async (search: string) => {
    return await api.get(
      `${search ? `/room/loadRooms?search=${search}` : "/room/loadRooms"}`,
    );
  },
  storeRoom: async (data: any) => {
    return await api.post("/room/storeRoom", data);
  },
  updateRoom: async (roomId: string | number, data: any) => {
    return await api.post(`/room/updateRoom/${roomId}`, data);
  },
  destroyRoom: async (roomId: string | number) => {
    return await api.delete(`/room/destroyRoom/${roomId}`);
  },
};

export default RoomService;
