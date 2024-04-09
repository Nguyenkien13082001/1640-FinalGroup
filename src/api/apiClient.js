import qs from "querystring";
import axios from "axios";

// const baseURLApp = "http://192.168.72.130:5000";

const apiClient = axios.create({
  baseURL: "baseURLApp ",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (config.headers) {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (typeof window === "undefined") {
      throw error;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
