import { useState } from "react";
import SectionBanner from "../../components/SectionBanner";
import useAppointment from "../../hooks/useAppointment";
import useCategories from "../../hooks/useCategories";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUser";

const Checkout = () => {
  const [appointment] = useAppointment();
  const [users, loading] = useUsers();
  const axiosSecure = useAxiosSecure();
  const [categories] = useCategories();
  const [selectedAppointments, setSelectedAppointments] = useState([]); // Track selected items
  const [totalPrice, setTotalPrice] = useState(0);

  if (loading) {
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400"></span>
      </div>
    );
  }
  // Handle checkbox change
  const handleCheckboxChange = (appointmentId, category) => {
    const categoryData = categories.find(
      (cat) => cat.serviceProviderType === category
    );
    const appointmentPrice = categoryData?.price || 0;
    console.log(appointmentPrice);

    setSelectedAppointments((prevSelected) => {
      const isSelected = prevSelected.includes(appointmentId);

      if (isSelected) {
        // If deselected, subtract price and remove from selected
        setTotalPrice(totalPrice - appointmentPrice);
        return prevSelected.filter((id) => id !== appointmentId);
      } else {
        // If selected, add price and add to selected
        setTotalPrice(totalPrice + appointmentPrice);
        return [...prevSelected, appointmentId];
      }
    });
  };

  const handelCreatePayment = () => {
    axiosSecure
      .post("/create-payment", {
        selectedAppointments,
        amount: totalPrice,
        currency: "BDT",
        customerName: users.name,
        customerEmail: users.email,
      })
      .then((res) => {
        // console.log(res);
        const gatewayPageURL = res.data;
        console.log(gatewayPageURL);
        if (gatewayPageURL) {
          window.location.replace(gatewayPageURL);
        }
      });
  };

  // console.log("user from auth", user);
  console.log("user from db", users);
  return (
    <div className="-mt-20 min-h-screen lg:px-20 md:px-16 px-10 bg-gray-50">
      <SectionBanner
        title={"CheckOut "}
        descriptions={"select services from your booked appointment to payment"}
      ></SectionBanner>
      <div>
        <div className="overflow-x-auto md:flex gap-5">
          <table className="table table-zebra md:w-2/3 border p-3 md:p-5 lg:p-10 rounded-lg md:rounded-xl">
            {/* head */}
            <thead>
              <tr>
                <th>Check box</th>
                <th>Appointment</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Map through appointments */}
              {appointment.map((app, index) => {
                const categoryData = categories.find(
                  (cat) => cat.serviceProviderType === app.category
                );

                return (
                  <tr key={index}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={() =>
                            handleCheckboxChange(app._id, app.category)
                          }
                          checked={selectedAppointments.includes(app._id)} // Mark as checked if selected
                        />
                      </label>
                    </th>
                    <td>{app.category}</td>
                    <td className="text-xs lg:text-md">{app.date}</td>
                    <td className="text-xs lg:text-md">{app.time}</td>
                    <td>{categoryData?.price || "N/A"}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="md:w-1/3 lg:w-1/3 sticky top-4 mt-4 border p-3 md:p-5 lg:p-10 rounded-lg md:rounded-xl bg-white dark:bg-black text-black dark:text-dark-200 shadow-lg max-h-96">
            <div>
              <p className="font-bold text-lg">
                Total Price (Selected): {totalPrice.toFixed(2)} taka
              </p>
              <p className="font-bold text-lg">
                Total Item (Selected): {selectedAppointments.length}
              </p>
            </div>

            <button
              onClick={handelCreatePayment}
              disabled={selectedAppointments == 0}
              className="btn border-b-8 font-semibold 
      text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-300 hover:bg-primary-500 
      transition-all duration-200 w-full "
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
