import { useState } from "react";
import { useForm } from "react-hook-form";
import useUsers from "../../hooks/useUser";
import Loading from "../../components/Loading";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const WriteBlogs = () => {
  const [users, loading] = useUsers();
  const axiosSecure=useAxiosSecure()
  // Accessing environment variables
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1280, // Max width
        720, // Max height
        "WEBP", // Format: WEBP
        80, // Initial quality (adjustable)
        0, // Rotation
        (uri) => {
          // Convert base64 length to KB
          const byteSize = (uri.length * (3 / 4)) / 1024; // Base64 length to KB

          // Check if the image size exceeds 300 KB
          if (byteSize > 300) {
            // If the image is too large, reduce quality further
            Resizer.imageFileResizer(
              file,
              1280,
              720,
              "WEBP",
              70, // Reduced quality
              0,
              (uri) => {
                // Check size again after resizing
                const reducedByteSize = (uri.length * (3 / 4)) / 1024;
                if (reducedByteSize > 300) {
                  // If it's still too large, further reduce quality or take additional action
                  Resizer.imageFileResizer(
                    file,
                    1280,
                    720,
                    "WEBP",
                    60, // Further reduced quality for even smaller size
                    0,
                    (uri) => resolve(uri), // Finally resolve the file
                    "base64"
                  );
                } else {
                  resolve(uri); // Successfully resized within the limit
                }
              },
              "base64"
            );
          } else {
            resolve(uri); // Return if the image is already under the limit
          }
        },
        "base64"
      );
    });

  const onSubmit = async (data) => {
    if (!cloud_name || !preset_key) {
      throw new Error("Cloudinary configuration is missing");
    }

    // Ensure that the image is resized before uploading
    if (image) {
      try {
        const resizedImage = await resizeFile(image); // Resize the image first
        const formData = new FormData();
        formData.append("file", resizedImage); // Upload the resized image
        formData.append("upload_preset", preset_key);

        // Upload image to Cloudinary
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        const photoUrl = res.data.secure_url; // Cloudinary URL of the uploaded image

        const newBlog = {
          title: data.title,
          content: data.content,
          authorEmail: users.email,
          img: photoUrl, // Save the Cloudinary image URL
        };
        // post blog to database
        axiosSecure.post("/blogs",newBlog)
        .then(res=>console.log(res.data))
        console.log("New Blog Object:", newBlog);
      } catch (error) {
        setError("Error uploading image to Cloudinary.");
        console.error("Error uploading image:", error);
      }
    } else {
      setError("Please upload an image.");
    }

    setError(null); // Reset error state after submission
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Write a New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="title">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="content">
            Blog Content
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            rows="5"
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Write your blog content here"
          />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg" htmlFor="image">
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mt-2"
          />
        </div>
        <button
          type="submit"
          className="btn bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 md:text-xl text-lg w-full"
        >
          Submit Blog
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default WriteBlogs;
