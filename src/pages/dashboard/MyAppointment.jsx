import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";
import useAppointment from "../../hooks/useAppointment";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdVideoCall } from "react-icons/md";
import { useEffect } from "react";

const MyAppointment = () => {
  const [appointment, refetch] = useAppointment();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handelDeleteAppointment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/appointments/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Deleted!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  // const handleJoinMeeting = (_id) => {
  //   console.log(_id);
  // };

  return (
    <div>
      <SectionTitle heading="Appointments" subHeading="My Appointment" />
      <div>
        <div className="md:flex md:items-center md:justify-between text-center mx-auto">
          <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
            Total appointment: {appointment.length}
          </p>
          <Link
            to={"/checkout"}
            className="btn btn-ghost btn-outline btn-warning"
          >
            Pay
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price (Taka)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.status === "paid" ? (
                      <p className="text-yellow-500 font-semibold">Paid</p>
                    ) : item.status === "in-progress" ? (
                      <p className="text-green-500 font-semibold">
                        In Progress
                      </p>
                    ) : item.status === "on-going" ? (
                      <p className="text-red-500 font-semibold">On going</p>
                    ) : (
                      <p className="text-blue-500 font-semibold">
                        {item.status || "N/A"}
                      </p>
                    )}
                  </td>
                  <td>
                    {item.status === "paid" || item.status === "placed" ? (
                      <p className="text-yellow-500 font-semibold">
                        {item.status}
                      </p>
                    ) : item.status === "on-going" ||
                      item.status === "in-progress" ? (
                      <Link
                        to={`/room/${item._id}`}
                        className="btn btn-ghost btn-outline btn-error text-2xl"
                        // onClick={() => handleJoinMeeting(item._id)}
                        aria-label="Join Video Call"
                      >
                        <MdVideoCall />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handelDeleteAppointment(item._id)}
                        className="btn btn-ghost btn-outline btn-error "
                      >
                        <AiTwotoneDelete />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
