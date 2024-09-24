import localStorageHelper from "@/utils/localStorageHelper";
import axios from "axios";

const appApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

appApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const accessToken = localStorageHelper.getAccessToken();
      if (accessToken.expiresAt < new Date()) {
        const refreshToken = localStorageHelper.getRefreshToken();
        if (refreshToken.expiresAt < new Date()) {
          localStorageHelper.setAccessToken(null);
          localStorageHelper.setRefreshToken(null);
          return Promise.reject(error);
        } else {
        }
      }
    }
    return Promise.reject(error);
  }
);

export default appApi;
