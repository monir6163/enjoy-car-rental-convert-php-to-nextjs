import axios from "axios";
import { getCookie, setCookie } from "./getCookies";
import { baseUrl } from "./utils";

const serverCookie = async () => {
  const cookie = await getCookie();
  const accessToken = cookie?.accessToken?.value;
  const refreshToken = cookie?.refreshToken?.value;
  return { accessToken, refreshToken };
};
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
    const { accessToken, refreshToken } = await serverCookie();

    // Add cookies to the headers
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
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
        setCookie(res.data.data.accessToken, res.data.data.refreshToken);
        console.log("Refresh token new");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        console.log("Refresh token error");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
