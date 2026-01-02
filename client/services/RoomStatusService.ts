import api from "@/lib/axios";

const apiPrefix = '/room_status';

const RoomStatusService = {
  loadRoomStatuses: async () => {
    const response = await api.get(`${apiPrefix}/loadRoomStatuses`);
    return response;
  }
}

export default RoomStatusService;