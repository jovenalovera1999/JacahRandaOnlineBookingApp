import api from "@/lib/axios";

const BookingService = {
  storeBooking: async (data: any) => {
    const response = await api.post("/booking/storeBooking", data);
    return response;
  },
};

export default BookingService;
