import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://service-provider-server-cyan.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
