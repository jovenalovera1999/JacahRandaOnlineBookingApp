"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
