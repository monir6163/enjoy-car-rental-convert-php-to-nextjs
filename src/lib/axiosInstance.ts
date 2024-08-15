import axios from "axios";
import { getCookie } from "./getCookies";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://enjoycarrental.vercel.app"
      : "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.data.status === 401 &&
      error.response.data.message === "Unauthorized Token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Attempting to refresh token...");
        const cookie = await getCookie();
        // console.log("token nai", cookie?.refreshToken?.value);
        const res = await axiosInstance.get(
          "http://localhost:3000/api/auth/refresh-token",
          {
            withCredentials: true,
          }
        );
        // console.log("Refresh token new", res.data);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token error");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
