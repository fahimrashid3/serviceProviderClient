import axios from "axios";
import { Helmet } from "react-helmet";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCategories from "../../../hooks/useCategories";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateProviderProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [provider, setProvider] = useState({});
  const { user } = useAuth();
  const location = useLocation();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const [categories, categoriesLoading] = useCategories();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState("");

  // Fetch provider data
  useEffect(() => {
    if (location.state?.provider) {
      setProvider(location.state.provider);
      setUserImg(location.state.provider.userImg); // Initialize userImg with existing provider image
    } else {
      axiosSecure.get(`/provider/${user?.email}`).then((res) => {
        setProvider(res.data);
        setUserImg(res.data.userImg); // Initialize userImg with fetched provider image
      });
    }
  }, [axiosSecure, user, location.state]);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: provider,
  });

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
        file,
        800,
        800,
        "WEBP",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const onSubmit = async (data) => {
    console.log("Save button clicked");
    const { image } = data;

    let updatedUserImg = userImg; // Use the existing userImg by default

    // Check if a new image is selected
    if (image && image.length > 0) {
      try {
        const file = image[0];
        const resizedImage = await resizeImage(file);

        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        updatedUserImg = res.data.secure_url; // Update userImg with the new image URL
        setUserImg(updatedUserImg); // Update state
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Create the providerInfo object
    const providerInfo = {
      name: data.name || provider.name,
      email: data.email || provider.email,
      userImg: updatedUserImg || provider.userImg, // Use updatedUserImg
      qualification: data.qualification || provider.qualification,
      category: data.category || provider.category,
      rating: provider.rating,
      location: data.location || provider.location,
      about: data.about || provider.about,
      education: data.education || provider.education,
      workingExperience: data.workingExperience || provider.workingExperience,
      services: data.services || provider.services,
      rewards: data.rewards || provider.rewards,
      contactNumber: data.contactNumber || provider.contactNumber,
      timeTable: {
        Monday: data.timeTable.Monday || provider.timeTable?.Monday,
        Tuesday: data.timeTable.Tuesday || provider.timeTable?.Tuesday,
        Wednesday: data.timeTable.Wednesday || provider.timeTable?.Wednesday,
        Thursday: data.timeTable.Thursday || provider.timeTable?.Thursday,
        Friday: data.timeTable.Friday || provider.timeTable?.Friday,
        Saturday: data.timeTable.Saturday || provider.timeTable?.Saturday,
        Sunday: data.timeTable.Sunday || provider.timeTable?.Sunday,
      },
      totalReview: 0,
    };
    axiosSecure.patch("/provider", providerInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        navigate("/dashboard/providerHome");
        scrollTo(0, 0);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Information updated successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No changes detected!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  // Reset the form when provider data changes
  useEffect(() => {
    if (Object.keys(provider).length > 0) {
      reset(provider);
    }
  }, [provider, reset]);

  if (categoriesLoading)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400 "></span>
      </div>
    );

  return (
    <div className="md:p-4">
      <Helmet>
        <title>Update Provider Profile</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Personal Information Section */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="md:flex gap-5">
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name")}
              />
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                placeholder="example@email.com"
                className="input input-bordered w-full text-red-500"
                {...register("email")}
                readOnly
              />
            </div>
          </div>
          <div className="md:flex gap-5">
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
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                placeholder="Dhaka, Bangladesh"
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
            <input type="file" {...register("image")} />
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">
            Professional Information
          </h2>
          <div className="flex gap-5">
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
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="default"
                {...register("category")}
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

        {/* Time Table Section */}
        <div className="border p-4 rounded">
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
                  {...register(`timeTable.${day}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProviderProfile;
