import { useState } from "react";
import { useForm } from "react-hook-form";
import useUsers from "../../../hooks/useUser";
import Loading from "../../../components/Loading.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";

const UserProfile = () => {
  const [users, loading] = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(users?.photo || "");
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: users?.name || "",
      phone: users?.phone || "",
      photo: users?.photoUrl || "",
    },
  });
  const { logOut } = useAuth();

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

  if (loading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data); // Debugging line
    const updatedUserInfo = {
      ...data,
      email: users?.email,
      photo: selectedFile, // Include the selected file in the form data
    };

    console.log("Updated Data:", updatedUserInfo); // Log the updated data to check the changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setPreviewImage(users?.photo || "");
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file); // Store the selected file in state
    }
  };

  return (
    <div className="text-lg text-center lg:space-y-6 md:space-y-4 space-y-3 lg:max-w-[60%] md:max-w-[85%] max-w-[95%] mx-auto">
      <h1 className="font-semibold">Personal Information</h1>
      <div className="avatar flex justify-center">
        <div className="mask mask-squircle w-28 md:w-40 lg:w-56 relative">
          {/* Profile Image */}
          <img
            src={previewImage || users?.photoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {/* Edit Icon (Only visible in edit mode) */}
          {isEditing && (
            <label
              htmlFor="photoUrl"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              {/* Edit Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white hover:text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              {/* Hidden File Input */}
              <input
                type="file"
                id="photoUrl"
                {...register("photo", { required: "Photo is required" })}
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex justify-between">
            <p className="font-semibold">Name</p>
            {isEditing ? (
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="border rounded p-1"
              />
            ) : (
              <p>{users?.name}</p>
            )}
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm text-right">
              {errors.name.message}
            </p>
          )}
          <hr />
        </div>

        <div>
          <div className="flex justify-between">
            <p className="font-semibold">Email</p>
            <p>{users?.email}</p> {/* Email is displayed but not editable */}
          </div>
          <hr />
        </div>

        <div>
          <div className="flex justify-between">
            <p className="font-semibold">Phone Number</p>
            {isEditing ? (
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className="border rounded p-1"
              />
            ) : users?.phone ? (
              <p>{users?.phone}</p>
            ) : (
              <p>Phone number is not available</p>
            )}
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm text-right">
              {errors.phone.message}
            </p>
          )}
          <hr />
        </div>

        {isEditing ? (
          <div className="flex justify-center gap-3">
            <button
              type="submit"
              className="btn bg-primary-600 text-white hover:bg-primary-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn bg-transparent border-1 border-b-4 mx-auto border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={handelLogout}
              className="btn bg-transparent border-1 border-b-4 mx-auto border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
            >
              Logout
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
