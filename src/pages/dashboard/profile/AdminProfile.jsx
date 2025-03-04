import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaCalendarCheck, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: adminStats, isLoading: adminStatsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });

  // Provide default values while loading
  const userCount = adminStats?.userCount || 0;
  const appointmentHistoryCount = adminStats?.appointmentHistoryCount || 0;
  const providerCount = adminStats?.providerCount || 0;
  const revenue = adminStats?.revenue || 0;

  if (adminStatsLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl">Hi, welcome: {user?.name}</h2>
      <div className="stats shadow w-full md:mt-10 mt-2">
        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value">{userCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <FaCalendarCheck />
          </div>
          <div className="stat-title">Total Appointment complete</div>
          <div className="stat-value">{appointmentHistoryCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <FaUserDoctor />
          </div>
          <div className="stat-title">Total number of provider</div>
          <div className="stat-value">{providerCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <GiProfit />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value"> ৳ {revenue.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
