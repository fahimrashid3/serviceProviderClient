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
  const [isUpdating, setIsUpdating] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12 text-white text-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Profile Settings
              </h1>
              <p className="text-primary-100 text-lg">
                Manage your personal information
              </p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-12">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-12">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-100 shadow-xl">
                  <img
                    src={
                      previewImage ||
                      users?.photoUrl ||
                      "https://via.placeholder.com/160x160?text=Profile"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Edit Icon Overlay */}
                {isEditing && (
                  <label
                    htmlFor="photoUrl"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer transition-all duration-300 hover:bg-opacity-60"
                  >
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary-600"
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
                    </div>
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

              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {users?.name || "User Name"}
                </h2>
                <p className="text-gray-600">{users?.email}</p>
              </div>
            </div>

            {/* Form Section */}
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          {...register("name")}
                          className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">
                          {users?.name || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Address
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {users?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Field */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          {...register("phone")}
                          className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">
                          {users?.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing ? (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={handelLogout}
                    className="flex-1 px-8 py-4 border-2 border-red-500 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
