import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AppointmentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/appointmentHistory?email=${user.email}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <table className="table table-zebra">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Provider Email</th>
            <th>Price (Taka)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{appointment.date}</td>
              <td>{appointment.providerEmail}</td>
              <td>{appointment.price}</td>
              <td>Completed</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentHistory;
