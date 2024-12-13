import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";
import useAppointment from "../../hooks/useAppointment";

const MyAppointment = () => {
  const [appointment] = useAppointment();
  // TODO: delete appointment automatically if time or date is over
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

                  <td>
                    <button className="btn  btn-ghost btn-outline btn-error text-2xl">
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
