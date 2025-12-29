import api from "@/lib/axios";

const apiPrefix = "/notification";

const NotificationService = {
  countUnreadNotifications: async () => {
    const response = await api.get(`${apiPrefix}/countUnreadNotifications`);
    return response;
  },
  loadNotifications: async () => {
    const response = await api.get(`${apiPrefix}/loadNotifications`);
    return response;
  },
  updateNotificationToSeen: async (notificationId: string | number) => {
    const response = await api.put(
      `${apiPrefix}/updateNotificationToSeen/${notificationId}`
    );
    return response;
  },
};

export default NotificationService;
