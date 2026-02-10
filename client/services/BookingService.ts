import api from "@/lib/axios";

const apiPrefix = "/booking";

const BookingService = {
  loadBookingsOfCurrentLoggedInUserClient: async () => {
    const response = await api.get(
      `${apiPrefix}/loadBookingsOfCurrentLoggedInUserClient`,
    );
    return response;
  },
  loadBookings: async (userId: string | number, filter: string) => {
    const response = await api.get(
      filter
        ? `${apiPrefix}/loadBookings?user_id=${userId}&filter=${filter}`
        : `${apiPrefix}/loadBookings?user_id=${userId}`,
    );
    return response;
  },
  loadClients: async () => {
    const response = await api.get(`${apiPrefix}/loadClients`);
    return response;
  },
  loadCancelledBookings: async () => {
    const response = await api.get(`${apiPrefix}/loadCancelledBookings`);
    return response;
  },
  loadBookedDates: async () => {
    const response = await api.get(`${apiPrefix}/loadBookedDates`);
    return response;
  },
  storeBooking: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeBooking`, data);
    return response;
  },
  approveBooking: async (bookingId: string | number) => {
    const response = await api.post(`${apiPrefix}/approveBooking/${bookingId}`);
    return response;
  },
  checkInBooking: async (bookingId: string | number) => {
    const response = await api.post(`${apiPrefix}/checkInBooking/${bookingId}`);
    return response;
  },
  checkOutBooking: async (bookingId: string | number) => {
    const response = await api.post(
      `${apiPrefix}/checkOutBooking/${bookingId}`,
    );
    return response;
  },
  completeBooking: async (bookingId: string | number) => {
    const response = await api.post(
      `${apiPrefix}/completeBooking/${bookingId}`,
    );
    return response;
  },
  cancelBookingInAdminOrEmployeeSide: async (
    roomId: string | number,
    bookingId: string | number,
    data: any,
  ) => {
    const response = await api.post(
      `${apiPrefix}/cancelBookingInAdminOrEmployeeSide/${roomId}/${bookingId}`,
      data,
    );
    return response;
  },
  cancelBookingInClientSide: async (
    roomId: string | number,
    bookingId: string | number,
  ) => {
    const response = await api.delete(
      `${apiPrefix}/cancelBookingInClientSide/${roomId}/${bookingId}`,
    );
    return response;
  },
};

export default BookingService;
