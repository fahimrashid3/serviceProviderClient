import SectionTitle from "../../components/SectionTitle";
import useProviderAppointment from "../../hooks/useProviderAppointment";
import Loading from "../../components/Loading";
import { MdVideoCall } from "react-icons/md";
import { Link } from "react-router-dom";

const MyServices = () => {
  const [providerAppointments, , isLoading] = useProviderAppointment();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SectionTitle heading="Appointments" subHeading="My Appointment" />
      <div>
        <div>
          <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
            Total appointment: {providerAppointments.length}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price (Taka)</th>
                <th>Status</th>
                <th>Call Now</th>
              </tr>
            </thead>
            <tbody>
              {providerAppointments.length > 0 ? (
                providerAppointments.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.status === "paid" ? (
                        <p className="text-green-500 text-lg font-semibold">
                          Paid
                        </p>
                      ) : (
                        item.status || "N/A"
                      )}
                    </td>
                    <td>
                      {item.status !== "paid" ? (
                        <Link
                          to={`/room/${item._id}`}
                          className="btn btn-ghost btn-outline btn-error text-2xl"
                        >
                          <MdVideoCall />
                        </Link>
                      ) : (
                        <p>Paid</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyServices;
