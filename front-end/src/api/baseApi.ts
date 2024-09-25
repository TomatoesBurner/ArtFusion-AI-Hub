import localStorageHelper from "@/utils/localStorageHelper";
import axios from "axios";
import { AuthApi } from "./authApi";

export const nonAuthAppApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const appApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

appApi.interceptors.request.use((config) => {
  const acessToken = localStorageHelper.getAccessToken();
  if (acessToken.token) {
    config.headers["Authorization"] = `Bearer ${acessToken.token}`;
  }
  return config;
});
