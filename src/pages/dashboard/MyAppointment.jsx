import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";
import useAppointment from "../../hooks/useAppointment";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
        subHeading="MyAppointment"
      ></SectionTitle>
      <div>
        <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
          Total appointment : {appointment.length}
        </p>
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
                <th>Delete</th>
                <th>Payment</th>
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
                    <button
                      onClick={() => handelDeleteAppointment(item._id)}
                      className="btn  btn-ghost btn-outline btn-error text-2xl"
                    >
                      <AiTwotoneDelete />
                    </button>
                  </td>

                  <td>
                    <button className="btn btn-ghost btn-outline btn-warning">
                      Pay
                    </button>
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
