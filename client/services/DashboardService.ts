import api from "@/lib/axios";

const apiPrefix = "/dashboard";

const DashboardService = {
  countPendingApprovedCancelledCompleted: async () => {
    const response = await api.get(
      `${apiPrefix}/countPendingApprovedCancelledCompleted`
    );
    return response;
  },
};

export default DashboardService;
