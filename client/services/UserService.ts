import api from "@/lib/axios";

const apiPrefix = "/user";

const UserService = {
  loadUserReferences: async () => {
    const response = await api.get(`${apiPrefix}/loadUserReferences`);
    return response;
  },
  loadUsers: async (search: string) => {
    const response = await api.get(
      search
        ? `${apiPrefix}/loadUsers?search=${search}`
        : `${apiPrefix}/loadUsers`
    );
    return response;
  },
  storeUser: async (data: any) => {
    const response = await api.post(`${apiPrefix}/storeUser`, data);
    return response;
  },
  updateUser: async (userId: string | number, data: any) => {
    const response = await api.put(`${apiPrefix}/updateUser/${userId}`, data);
    return response;
  },
  destroyUser: async (userId: string | number) => {
    const response = await api.delete(`${apiPrefix}/destroyUser/${userId}`);
    return response;
  },
};

export default UserService;
