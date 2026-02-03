import api from "@/lib/axios";

const apiPrefix = "/order";

const OrderService = {
  loadOrders: async () => {
    const response = await api.get(`${apiPrefix}/loadOrders`);
    return response;
  },
  storeOrder: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeOrder`, data);
    return response;
  },
};

export default OrderService;
