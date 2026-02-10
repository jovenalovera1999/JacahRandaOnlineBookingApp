import api from "@/lib/axios";

const apiPrefix = "/food_cart";

const FoodCartService = {
  loadFoodCarts: async (orderId: string | Number) => {
    const response = await api.get(
      `${apiPrefix}/loadFoodCarts?order_id=${orderId}`,
    );
    return response;
  },
};

export default FoodCartService;
