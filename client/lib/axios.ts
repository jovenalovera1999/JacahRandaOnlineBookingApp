"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Refresh token
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     try {
//       if (error.response.status === 401) {
//         await api.post("/auth/refresh");
//         return api(error.config);
//       }
//     } catch {
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   }
// );

// Request data
api.interceptors.request.use(
  (config) => {
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response data
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
