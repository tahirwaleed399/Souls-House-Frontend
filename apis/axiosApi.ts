import { backendUrl } from "@/utils/backendUrl";
import axios from "axios";

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Make a new request to refresh the token
      return axios
        .get(backendUrl+"/refresh-tokens")
        .then((response) => {
       
          return api(originalRequest);
        })

        .catch((error) => {
          console.error("Error refreshing token:", error);
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

export default api;
