import api from "@/lib/axios";

const RoomTypeService = {
  loadRoomTypes: async () => {
    const response = await api.get("/room_type/loadRoomTypes");
    return response;
  },
};

export default RoomTypeService;
