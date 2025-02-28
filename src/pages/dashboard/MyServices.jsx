import SectionTitle from "../../components/SectionTitle";
import useProviderAppointment from "../../hooks/useProviderAppointment";
import Loading from "../../components/Loading";
import { MdVideoCall } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyServices = () => {
  const axiosSecure = useAxiosSecure();
  const [providerAppointments, refetch, isLoading] = useProviderAppointment();

  if (isLoading) {
    return <Loading />;
  }
  const handelComplete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark as complete!",
    }).then((result) => {
      if (result.isConfirmed) {
        const appointmentUpdateInfo = {
          appointmentId: _id,
        };

        axiosSecure
          .post("/completeAppointment", appointmentUpdateInfo)
          .then((response) => {
            if (response.data.insertedId && response.data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Appointment saved as complete",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Error updating appointment:", error);
          });
      }
    });
  };

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
                <th>Status</th>
                <th>Mark as complete</th>
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
                      {item.status === "on-going" ? (
                        <button
                          onClick={() => handelComplete(item._id)}
                          className="btn btn-ghost btn-outline btn-warning text-2xl"
                        >
                          <FaEdit />
                        </button>
                      ) : (
                        <p>{item.status}</p>
                      )}
                    </td>

                    <td>
                      {item.status === "paid" ? (
                        <p>paid</p>
                      ) : item.status === "complete" ? (
                        <p>complete</p>
                      ) : (
                        <Link
                          to={`/room/${item._id}`}
                          className="btn btn-ghost btn-outline btn-error text-2xl"
                          aria-label="Join Video Call"
                        >
                          <MdVideoCall />
                        </Link>
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
