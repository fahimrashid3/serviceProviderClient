// src/hooks/useAxiosSecure.js

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8000", // change if using live server
});

let isInterceptorAttached = false;

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInterceptorAttached) {
      isInterceptorAttached = true;

      // Attach request interceptor
      axiosSecure.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("access-token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Attach response interceptor
      axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          const status = error.response?.status;
          if (status === 401 || status === 403) {
            console.warn("Unauthorized, logging out...");
            await logOut();
            navigate("/login");
          }
          return Promise.reject(error);
        }
      );
    }
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
