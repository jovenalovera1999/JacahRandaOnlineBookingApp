import api from "@/lib/axios";

const apiPrefix = "/food";

const FoodService = {
  loadFoodReferences: async () => {
    const response = await api.get(`${apiPrefix}/loadFoodReferences`);
    return response;
  },
};

export default FoodService;
