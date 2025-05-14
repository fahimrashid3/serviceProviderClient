import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Create one axios instance globally
const axiosSecure = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://service-provider-server-cyan.vercel.app/",
});

const setupInterceptors = () => {
  // Prevent setting up interceptors multiple times
  if (axiosSecure.interceptors.request.handlers.length > 0) return;

  // Request interceptor to add JWT token
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      console.log("Interceptor caught error with status:", status);
      return Promise.reject(error);
    }
  );
};

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  setupInterceptors(logOut, navigate);

  return axiosSecure;
};

export default useAxiosSecure;
