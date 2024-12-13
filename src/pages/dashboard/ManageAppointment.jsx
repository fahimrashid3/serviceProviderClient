import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";

const ManageAppointment = () => {
  const axiosSecure = useAxiosSecure();
  // tan stack query

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllAppointments`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        heading="Manage Appointment"
        subHeading="All Appointment"
      ></SectionTitle>
      <div>
        <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
          Total appointment : {appointments.length}
        </p>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>item</th>
                <th>Email</th>
                <th>date</th>
                <th>Time</th>
                <th>Price (Taka)</th>
                <th>Delete</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {appointments.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.category}</td>
                  <td>{item.email}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.price}</td>

                  <td>
                    <button className="btn  btn-ghost btn-outline btn-error text-2xl">
                      <AiTwotoneDelete />
                    </button>
                  </td>

                  <td>
                    <button className="btn btn-ghost btn-outline btn-warning">
                      painting
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

export default ManageAppointment;
