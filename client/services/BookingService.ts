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
  countUnreadNotificationsAndLoadCancelledBookings: async () => {
    const response = await api.get(
      `${apiPrefix}/countUnreadNotificationsAndLoadCancelledBookings`
    );
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
  approveBooking: async (
    roomId: string | number,
    bookingId: string | number
  ) => {
    const response = await api.put(
      `${apiPrefix}/approveBooking/${roomId}/${bookingId}`
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
