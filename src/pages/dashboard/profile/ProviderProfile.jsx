import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProviderProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [provider, setProvider] = useState({});
  const { user, logOut } = useAuth();

  useEffect(() => {
    axiosSecure
      .get(`/provider/${user?.email}`)
      .then((res) => setProvider(res.data));
  }, [axiosSecure, user]);

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "LogOut Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };
  return (
    <div className="md:p-4">
      <div className="p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="mask mask-squircle w-28 md:w-40 lg:w-56 relative">
            <img
              src={provider?.userImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          {/* input name */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              placeholder="Name"
              className="input input-bordered w-full"
              value={provider?.name || ""}
            />
          </div>
          {/* input email */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              placeholder="example@email.com"
              className="input input-bordered w-full"
              value={provider?.email || ""}
              readOnly
            />
          </div>
        </div>
        <div className="md:flex gap-5">
          {/* contact number */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input
              placeholder="+8801*********"
              className="input input-bordered w-full"
              value={provider?.contactNumber || ""}
              readOnly
            />
          </div>
          {/* location */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              placeholder="Dhaka, Bangladesh"
              className="input input-bordered w-full"
              value={provider?.location || ""}
              readOnly
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">About</span>
          </label>
          <textarea
            placeholder="Details about You"
            className="textarea textarea-bordered textarea-md w-full max-w-full"
            value={provider?.about || ""}
            readOnly
          />
        </div>
      </div>
      <div className="p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Professional Information</h2>
        <div className="flex gap-5">
          {/* qualification */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Qualification</span>
            </label>
            <input
              placeholder="MSc, PhD"
              className="input input-bordered w-full"
              value={provider?.qualification || ""}
              readOnly
            />
          </div>
          {/* select category */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={provider?.category || ""}
              readOnly
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">
            <span className="label-text">Education</span>
          </label>
          {provider?.education?.map((edu, index) => (
            <div
              key={index}
              className="space-y-2 md:space-x-3 flex items-center"
            >
              <input
                className="input input-bordered w-full max-w-lg"
                placeholder="Degree"
                value={edu.degree || ""}
                readOnly
              />
              <input
                className="input input-bordered w-full max-w-lg"
                placeholder="Institution"
                value={edu.institution || ""}
                readOnly
              />
              <input
                className="input input-bordered w-full max-w-lg"
                placeholder="Year"
                value={edu.time || ""}
                readOnly
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="label">
            <span className="label-text">workingExperience</span>
          </label>
          {provider?.workingExperience?.map((exp, index) => (
            <div
              key={index}
              className="space-y-2 md:space-x-3 flex items-center py-2"
            >
              <input
                className="input input-bordered w-full max-w-lg"
                placeholder="Degree"
                value={exp || ""}
                readOnly
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="label">
            <span className="label-text">services</span>
          </label>
          {provider?.services?.map((exp, index) => (
            <div
              key={index}
              className="space-y-2 md:space-x-3 flex items-center py-2"
            >
              <input
                className="input input-bordered w-full max-w-lg"
                placeholder="Degree"
                value={exp || ""}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <label className="label">
          <span className="label-text">rewards</span>
        </label>
        {provider?.rewards?.map((rew, index) => (
          <div key={index} className="space-y-2 md:space-x-3 flex items-center">
            <input
              className="input input-bordered w-full max-w-lg"
              placeholder="Degree"
              value={rew.name || ""}
              readOnly
            />
            <input
              className="input input-bordered w-full max-w-lg"
              placeholder="Institution"
              value={rew.date || ""}
              readOnly
            />
            <input
              className="input input-bordered w-full max-w-lg"
              placeholder="Year"
              value={rew.description || ""}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Time Table</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div key={day} className="form-control">
              <label className="label">
                <span className="label-text">{day}</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder={`Time for ${day}`}
                value={provider?.timeTable?.[day] || ""}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <Link
          to={`/dashboard/updateProviderProfile/${provider.email}`}
          type="button"
          className="btn bg-transparent border-1 border-b-4 mx-auto border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
        >
          Edit Profile
        </Link>
        <button
          type="button"
          className="btn bg-transparent border-1 border-b-4 mx-auto border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
          onClick={handelLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProviderProfile;
