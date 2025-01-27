import Loading from "./Loading";
import useProviders from "../hooks/useProviders";
import { Navigate } from "react-router-dom";

const AssignProvider = ({ appointment }) => {
  const [providers, providersLoading] = useProviders();

  // Redirect to a default page if `item` is missing
  if (!appointment) {
    Navigate("/dashboard"); // Adjust this path as needed
    return null;
  }

  // Filter providers based on the item's category
  const requiredProvider = providers.filter(
    (provider) => provider.status === appointment.serviceProviderType
  );
  console.log("all provider", providers);
  console.log(requiredProvider);
  if (providersLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-5">
      <p className="text-center font-semibold text-2xl mb-5">
        Appointment Details
      </p>

      {/* Display User Details */}
      <div className="flex justify-center gap-10 text-lg">
        <div className="font-semibold">
          <p>Type:</p>
          <p>Date:</p>
          <p>Time:</p>
          <p>User Email:</p>
          <p>Status:</p>
        </div>
        <div>
          <p>{appointment.category || "N/A"}</p>
          <p>{appointment.date || "N/A"}</p>
          <p>{appointment.time || "N/A"}</p>
          <p>{appointment.email || "N/A"}</p>
          <p>{appointment.status || "Paid"}</p>
        </div>
      </div>

      {/* Dropdown to Select Provider */}
      <div className="mt-10 text-center">
        <label
          htmlFor="providerSelect"
          className="block font-semibold text-lg mb-2"
        >
          Assign a Provider:
        </label>
        <select
          id="providerSelect"
          className="select select-ghost w-full max-w-xs border border-gray-300 rounded-md p-2"
        >
          <option disabled selected>
            Pick the best {appointment.category || "provider"}
          </option>
          {requiredProvider.map((provider) => (
            <option key={provider._id} value={provider._id}>
              {`Name:${provider.name} Email:${provider.email}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AssignProvider;
