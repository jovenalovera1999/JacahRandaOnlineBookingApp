import api from "@/lib/axios";

const apiPrefix = "/booking";

const BookingService = {
  loadPendingBookingsOfCurrentClientUserLoggedIn: async () => {
    const response = await api.get(
      `${apiPrefix}/loadPendingBookingsOfCurrentClientUserLoggedIn`
    );
    return response;
  },
  loadBookings: async (filter: string) => {
    const response = await api.get(filter ? `${apiPrefix}/loadBookings?filter=${filter}` : `${apiPrefix}/loadBookings`);
    return response;
  },
  loadCancelledBookings: async () => {
    const response = await api.get(`${apiPrefix}/loadCancelledBookings`);
    return response;
  },
  storeBooking: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeBooking`, data);
    return response;
  },
  approveBooking: async (
    bookingId: string | number
  ) => {
    const response = await api.post(
      `${apiPrefix}/approveBooking/${bookingId}`
    );
    return response;
  },
  cancelBookingInAdminOrEmployeeSide: async (
    roomId: string | number,
    bookingId: string | number,
    data: any
  ) => {
    const response = await api.post(
      `${apiPrefix}/cancelBookingInAdminOrEmployeeSide/${roomId}/${bookingId}`,
      data
    );
    return response;
  },
  cancelBookingInClientSide: async (
    roomId: string | number,
    bookingId: string | number
  ) => {
    const response = await api.delete(
      `${apiPrefix}/cancelBookingInClientSide/${roomId}/${bookingId}`
    );
    return response;
  },
};

export default BookingService;
