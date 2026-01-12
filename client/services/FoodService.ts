import api from "@/lib/axios";

const apiPrefix = "/food";

const FoodService = {
  loadFoodReferences: async () => {
    const response = await api.get(`${apiPrefix}/loadFoodReferences`);
    return response;
  },
  loadFoods: async () => {
    const response = await api.get(`${apiPrefix}/loadFoods`);
    return response;
  },
  storeFood: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeFood`, data);
    return response;
  },
};

export default FoodService;
