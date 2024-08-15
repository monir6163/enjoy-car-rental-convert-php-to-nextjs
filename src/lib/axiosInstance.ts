import { useAuth } from "@/app/provider/AuthContext";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://enjoycarrental.vercel.app",
  withCredentials: true, // This ensures cookies are sent with requests
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post("/api/auth/refresh-token");
        const accessToken = response.data.accessToken;

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const { logout } = useAuth() as any;
        if (logout) logout(); // Log out if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
