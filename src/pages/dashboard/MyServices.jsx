import SectionTitle from "../../components/SectionTitle";
import useProviderAppointment from "../../hooks/useProviderAppointment";
import { FaEdit } from "react-icons/fa";
import Loading from "../../components/Loading";

const MyServices = () => {
  const [providerAppointments, refetch, isLoading] = useProviderAppointment();

  const handelVideoCall = () => {
    refetch();
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <SectionTitle
        heading="Appointments"
        subHeading="My Appointment"
      ></SectionTitle>
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
                <th>Item</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price (Taka)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {providerAppointments.length > 0 ? (
                providerAppointments.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.category}</td>
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
                        <button
                          onClick={handelVideoCall}
                          className="btn btn-ghost btn-outline btn-error text-2xl"
                        >
                          <FaEdit />
                        </button>
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
