import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: aLLAppointments = [], refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllAppointments`);
      return res.data;
    },
  });
  return [aLLAppointments, refetch];
};
export default useAppointments;
