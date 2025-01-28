import Loading from "./Loading";
import useProviders from "../hooks/useProviders";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAppointments from "../hooks/useAppointments";

const AssignProvider = ({ appointment }) => {
  const [, refetch] = useAppointments();

  const [providers, providersLoading] = useProviders();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Retrieve provider details using the selected value
    const selectedProvider = providers.find(
      (provider) => provider._id === data.selectItem
    );
    const appointmentUpdateInfo = {
      appointmentId: appointment._id,
      status: "placed",
      providerEmail: selectedProvider.email,
    };

    axiosSecure.patch("/appointment", appointmentUpdateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        reset();
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Appointment Placed to ${selectedProvider.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (!appointment) {
    Navigate("/dashboard"); // Adjust this path as needed
    return null;
  }

  const requiredProvider = providers.filter(
    (provider) => provider.category === appointment.category
  );
  console.log(requiredProvider);
  if (providersLoading) {
    return <Loading />;
  }

  return (
    <div className="p-5">
      <p className="text-center font-semibold text-2xl mb-5">
        Appointment Details
      </p>

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 text-center">
          <label
            htmlFor="providerSelect"
            className="block font-semibold text-lg mb-2"
          >
            Assign a Provider:{appointment.category}
          </label>
          <select
            id="providerSelect"
            className="select select-ghost w-full max-w-lg border border-gray-300 rounded-md p-2"
            {...register("selectItem", { required: true })}
          >
            <option disabled selected>
              = {appointment.providerEmail || "N/A"}
            </option>
            {requiredProvider.map((provider) => (
              <option key={provider._id} value={provider._id}>
                {`Name:${provider.name} Email:${provider.email} Email:${provider.category}`}
              </option>
            ))}
          </select>
        </div>
        <button
          className="
          btn border-b-8 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-300 hover:bg-primary-500 
                    transition-all duration-200 w-full"
        >
          Assign {requiredProvider.category}
        </button>
      </form>
    </div>
  );
};

export default AssignProvider;
