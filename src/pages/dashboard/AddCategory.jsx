import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddCategory = () => {
  const [disabled, setDisabled] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();
  // Accessing environment variables
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  // Function to resize image
  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // File to resize
        800, // Max width
        800, // Max height
        "WEBP", // Output format
        90, // Quality (0-100)
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "file" // Output type
      );
    });
  const onSubmit = async (data) => {
    const { serviceProviderType, price, time, image } = data;
    try {
      if (!cloud_name || !preset_key) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cloudinary configuration is missing",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // Resize the image
      const file = image[0];
      const resizedImage = await resizeImage(file);

      // Upload resized image to Cloudinary
      const formData = new FormData();
      formData.append("file", resizedImage);
      formData.append("upload_preset", preset_key);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      const serviceImg = res.data.secure_url;

      const categoryInfo = { serviceProviderType, price, time, serviceImg };
      // console.log(categoryInfo);
      axiosSecure.post("/category", categoryInfo).then((res) => {
        if (res.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "A New category has been added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      // Handle errors
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setDisabled(false);
    }

    // console.log(data);
    reset();
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="Text"
                placeholder="Name"
                {...register("serviceProviderType", { required: true })}
                className="input input-bordered bg-white text-dark-900"
              />
              {errors.serviceProviderType && (
                <span className="text-red-500">Name required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Appointment price"
                {...register("price", { required: true })}
                className="input input-bordered bg-white text-dark-900"
              />
              {errors.price && (
                <span className="text-red-500">Price required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Appointment Time</span>
              </label>
              <input
                type="text"
                placeholder="Appointment Time"
                {...register("time", { required: true })}
                className="input input-bordered bg-white text-dark-900"
              />
              {errors.time && (
                <span className="text-red-500">Time required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select service Image</span>
              </label>
              <input type="file" {...register("image", { required: true })} />
            </div>
            <div className="form-control mt-6">
              <button
                disabled={disabled}
                type="submit"
                className="btn btn-warning btn-outline border-1 border-b-8"
              >
                Add new category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
