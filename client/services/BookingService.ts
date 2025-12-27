import api from "@/lib/axios";

const apiPrefix = "/booking";

const BookingService = {
  loadPendingBookingsOfCurrentClientUserLoggedIn: async () => {
    const response = await api.get(
      `${apiPrefix}/loadPendingBookingsOfCurrentClientUserLoggedIn`
    );
    return response;
  },
  loadPendingBookings: async () => {
    const response = await api.get(`${apiPrefix}/loadPendingBookings`);
    return response;
  },
  storeBooking: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeBooking`, data);
    return response;
  },
  approveBooking: async (
    roomId: string | number,
    bookingId: string | number
  ) => {
    const response = await api.put(
      `${apiPrefix}/approveBooking/${roomId}/${bookingId}`
    );
    return response;
  },
  cancelBooking: async (
    roomId: string | number,
    bookingId: string | number
  ) => {
    const response = await api.delete(
      `${apiPrefix}/cancelBooking/${roomId}/${bookingId}`
    );
    return response;
  },
};

export default BookingService;
