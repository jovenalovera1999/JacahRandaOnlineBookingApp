import api from "@/lib/axios";

const RoomTypeService = {
  loadRoomTypes: async () => {
    const response = api.get("/loadRoomTypes");
    return response;
  },
};
