import axios from "axios";
import { getCookie } from "./getCookies";
import { baseUrl } from "./utils";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the cookies
    const { accessToken, refreshToken, csrfToken } = await getCookie();
    console.log("CSRF Token: ", csrfToken?.value);

    // Add cookies to the headers
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken?.value}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken?.value;
    }

    // add csrf token to the headers
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken?.value;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

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
        // console.log("token nai", cookie?.refreshToken?.value);
        const res = await axiosInstance.post(`${baseUrl}/users/refresh-token`);
        console.log("Refresh token new");
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
