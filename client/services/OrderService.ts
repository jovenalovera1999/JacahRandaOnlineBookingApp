import api from "@/lib/axios";

const apiPrefix = "/order";

const OrderService = {
  loadOrders: async () => {
    const response = await api.get(`${apiPrefix}/loadOrders`);
    return response;
  },
  getOrder: async (orderId: string | Number) => {
    const response = await api.get(`${apiPrefix}/getOrder/${orderId}`);
    return response;
  },
  storeOrder: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeOrder`, data);
    return response;
  },
  updateOrderToPreparing: async (orderId: string | Number) => {
    const response = await api.post(
      `${apiPrefix}/updateOrderToPreparing/${orderId}`,
    );
    return response;
  },
  updateOrderToServing: async (orderId: string | Number) => {
    const response = await api.post(
      `${apiPrefix}/updateOrderToServing/${orderId}`,
    );
    return response;
  },
  updateOrderToServed: async (orderId: string | Number) => {
    const response = await api.post(
      `${apiPrefix}/updateOrderToServed/${orderId}`,
    );
    return response;
  },
};

export default OrderService;
