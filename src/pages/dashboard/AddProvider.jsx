import axios from "axios";
import { Helmet } from "react-helmet";
import { useForm, useFieldArray } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function AddProvider() {
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const [categories, categoriesLoading] = useCategories();
  const [response, setResponse] = useState("");
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields: educationFields, append: addEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: workingFields, append: addWorkingExperience } = useFieldArray(
    {
      control,
      name: "workingExperience",
    }
  );

  const { fields: servicesFields, append: addService } = useFieldArray({
    control,
    name: "services",
  });

  const { fields: rewardsFields, append: addReward } = useFieldArray({
    control,
    name: "rewards",
  });

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
    const { image } = data;
    // Get the image file
    const file = image[0];
    const resizedImage = await resizeImage(file);

    // Prepare form data for image upload to Cloudinary
    const formData = new FormData();
    formData.append("file", resizedImage);
    formData.append("upload_preset", preset_key);

    // Upload the image to Cloudinary
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    // Get the secure URL of the uploaded image
    const userImg = res.data.secure_url;
    // console.log(userImg);

    // Create the providerInfo object
    const providerInfo = {
      name: data.name || "",
      email: data.email || "",
      userImg: userImg || "",
      qualification: data.qualification || "",
      category: data.category || "",
      rating: 0,
      location: data.location || "",
      about: data.about || "",
      education: data.education || [],
      workingExperience: data.workingExperience || [],
      services: data.services || [],
      rewards: data.rewards || [],
      contactNumber: data.contactNumber || "",
      timeTable: {
        Monday: data.timeTable.Monday || "",
        Tuesday: data.timeTable.Tuesday || "",
        Wednesday: data.timeTable.Wednesday || "",
        Thursday: data.timeTable.Thursday || "",
        Friday: data.timeTable.Friday || "",
        Saturday: data.timeTable.Saturday || "",
        Sunday: data.timeTable.Sunday || "",
      },
      totalReview: 0,
    };

    // console.log(providerInfo);
    AxiosSecure.post("/providers", providerInfo).then((res) => {
      if (res.data.insertedId) {
        setResponse("");
        navigate("/");
        scrollTo(0, 0);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Provider added successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        setResponse(res.data.message);
      }
    });
  };

  if (categoriesLoading)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400 "></span>
      </div>
    );

  return (
    <div className="md:p-4">
      <Helmet>
        <title>Add Provider</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="md:flex gap-5">
            {/* input name */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* input email */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                placeholder="example@email.com"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
                {...register("contactNumber")}
              />
            </div>
            {/* location */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                placeholder="Dhaka, bangladesh"
                className="input input-bordered w-full"
                {...register("location")}
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
              {...register("about")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input type="file" {...register("image", { required: true })} />
          </div>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">
            Professional Information
          </h2>
          <div className="flex gap-5">
            {/* qualification */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Qualification</span>
              </label>
              <input
                placeholder="MSc, PhD"
                className="input input-bordered w-full"
                {...register("qualification")}
              />
            </div>
            {/* select category */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select an item
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.serviceProviderType}>
                    {category.serviceProviderType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text">Education</span>
            </label>
            {educationFields.map((item, index) => (
              <div key={item.id} className="space-y-2 md:space-x-3">
                <input
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Degree"
                  {...register(`education.${index}.degree`)}
                />
                <input
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Institution"
                  {...register(`education.${index}.institution`)}
                />
                <input
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Year"
                  {...register(`education.${index}.time`)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addEducation({ degree: "", institution: "", time: "" })
              }
              className="btn btn-sm btn-outline mt-2"
            >
              Add Education
            </button>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text">Working Experience</span>
            </label>
            {workingFields.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <input
                  className="input input-bordered w-full"
                  placeholder="Experience"
                  {...register(`workingExperience.${index}`)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addWorkingExperience("")}
              className="btn btn-sm btn-outline mt-2"
            >
              Add Experience
            </button>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text">Services</span>
            </label>
            {servicesFields.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <input
                  className="input input-bordered w-full"
                  placeholder="Service"
                  {...register(`services.${index}`)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addService("")}
              className="btn btn-sm btn-outline mt-2"
            >
              Add Service
            </button>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text">Rewards</span>
            </label>
            {rewardsFields.map((item, index) => (
              <div key={item.id} className="space-y-2 md:space-x-3">
                <input
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Reward Name"
                  {...register(`rewards.${index}.name`)}
                />
                <input
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Date"
                  {...register(`rewards.${index}.date`)}
                />
                <input
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Description"
                  {...register(`rewards.${index}.description`)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addReward({ name: "", date: "", description: "" })}
              className="btn btn-sm btn-outline mt-2"
            >
              Add Reward
            </button>
          </div>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Time table</h2>
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
                  {...register(`timeTable.${day}`)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-lg w-[95%] mx-auto"
        >
          Add Provider
        </button>
        <p className="text-red-700 text-center font-semibold text-lg">
          {response}
        </p>
      </form>
    </div>
  );
}
