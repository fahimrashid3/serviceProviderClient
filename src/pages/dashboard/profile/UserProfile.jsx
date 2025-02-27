import { useState } from "react";
import { useForm } from "react-hook-form";
import useUsers from "../../../hooks/useUser";
import Loading from "../../../components/Loading.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Resizer from "react-image-file-resizer";
import useAxiosPublic from "../../../hooks/useAxiosPublic.jsx";

const UserProfile = () => {
  const [users, loading] = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(users?.photoUrl || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // Loading state for updates
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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
    return <Loading />;
  }

  // Accessing environment variables
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  // Function to resize image
  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "WEBP",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "file" // Output type
      );
    });
  const onSubmit = async (data) => {
    setIsUpdating(true); // Start loading state

    try {
      let photoUrl = users?.photoUrl; // Default to existing photo URL

      // Upload new image if a file is selected
      if (selectedFile) {
        const resizedImage = await resizeImage(selectedFile);

        // Upload resized image to Cloudinary
        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);

        const res = await axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        photoUrl = res.data.secure_url; // Update photo URL with new image
      }

      // Prepare updated user info
      const updatedUserInfo = {
        name: data.name,
        phone: data.phone,
        photoUrl: photoUrl,
        email: users?.email, // Include email for filtering
      };

      // Update user profile in the database
      const updateRes = await axiosSecure.patch("/user", updatedUserInfo);
      console.log(updateRes);
      if (updateRes.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false); // Exit edit mode
        setPreviewImage(photoUrl); // Update preview image
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || "Failed to update profile",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsUpdating(false); // End loading state
    }
  };
  const handleCancel = () => {
    reset();
    setPreviewImage(users?.photoUrl || "");
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
              <input
                type="file"
                id="photoUrl"
                {...register("photo")}
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
                {...register("name")}
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
                type="number"
                {...register("phone")}
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

        {isEditing && (
          <div className="flex justify-center gap-3">
            <button
              type="submit"
              className="btn bg-primary-600 text-white hover:bg-primary-700"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      {!isEditing && (
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
    </div>
  );
};

export default UserProfile;
