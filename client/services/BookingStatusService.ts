import api from "@/lib/axios";

const apiPrefix = '/booking_status';

const BookingStatusService = {
  loadBookingStatuses: async () => {
    const response = await api.get(`${apiPrefix}/loadBookingStatuses`);
    return response;
  }
}

export default BookingStatusService;