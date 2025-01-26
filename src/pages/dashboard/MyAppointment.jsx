import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";
import useAppointment from "../../hooks/useAppointment";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyAppointment = () => {
  const [appointment, refetch] = useAppointment();
  const axiosSecure = useAxiosSecure();
  // TODO: delete appointment automatically if time or date is over
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
  return (
    <div>
      <SectionTitle
        heading="Appointments"
        subHeading="My Appointment"
      ></SectionTitle>
      <div>
        <div className="md:flex md:items-center md:justify-between text-center mx-auto">
          <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
            Total appointment : {appointment.length}
          </p>
          {/*TODO:add button for every appointment to ensure user experience   */}
          <Link
            to={"/checkout"}
            className="btn btn-ghost btn-outline btn-warning"
          >
            Pay
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>item</th>
                <th>date</th>
                <th>Time</th>
                <th>Price (Taka)</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {appointment.map((item, index) => (
                <tr key={index}>
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
                        onClick={() => handelDeleteAppointment(item._id)}
                        className="btn  btn-ghost btn-outline btn-error text-2xl"
                      >
                        <AiTwotoneDelete />
                      </button>
                    ) : (
                      <p>Paid</p>
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
