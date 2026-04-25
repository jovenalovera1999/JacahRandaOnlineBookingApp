import api from "@/lib/axios";

const apiPrefix = "/dashboard";

const DashboardService = {
  loadDashboard: async () => {
    return await api.get(`${apiPrefix}/loadDashboard`);
  },
};

export default DashboardService;
