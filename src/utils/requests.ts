import axios, { AxiosInstance } from "axios";

const service: AxiosInstance = axios.create({
  baseURL: "https://api.realworld.io/api/",
  timeout: 5000,
});
service.interceptors.request.use((config) => {
  return config;
});
service.interceptors.response.use((res) => {
  if (res.status === 200) {
    res = res.data;
  } else {
    console.error(res);
    return Promise.reject(new Error(`${res}`));
  }
  return res;
});

export default service;
