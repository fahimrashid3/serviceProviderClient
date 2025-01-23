import { useState } from "react";
import SectionBanner from "../../components/SectionBanner";
import useAppointment from "../../hooks/useAppointment";
import useCategories from "../../hooks/useCategories";

const Checkout = () => {
  const [appointment] = useAppointment();
  const [categories] = useCategories();
  const [selectedAppointments, setSelectedAppointments] = useState([]); // Track selected items
  const [totalPrice, setTotalPrice] = useState(0);
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

  return (
    <div className="-mt-20">
      <SectionBanner
        title={"CheckOut "}
        descriptions={"select services from your booked appointment to payment"}
      ></SectionBanner>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
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
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>{categoryData?.price || "N/A"}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Display total price */}
          <div className="text-right mt-4">
            <p className="font-bold text-lg">
              Total Price (Selected): ${totalPrice.toFixed(2)}
            </p>
          </div>
          {/* Display selected appointments array */}
          <div className="mt-4">
            <p className="font-bold text-md">Selected Appointments:</p>
            <ul>
              {selectedAppointments.map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
