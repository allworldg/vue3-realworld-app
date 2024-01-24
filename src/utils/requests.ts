import axios, { AxiosInstance } from "axios";
import { getCookie } from "./auth";
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
});
service.interceptors.request.use(
  (config) => {
    let cookie = getCookie();
    if (cookie !== undefined) {
      config.headers["Authorization"] = cookie;
    }
    return config;
  },
  (error) => {
    console.error(`${error}`);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
